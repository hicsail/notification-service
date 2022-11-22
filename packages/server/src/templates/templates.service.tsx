import { Logger, Injectable } from '@nestjs/common';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import theme from './projects/common/theme';
import createEmotionCache from './projects/common/createEmotionCache';
import path from 'path';
import { stat } from 'fs/promises';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  async getTemplate(templateName: string, props: any): Promise<any> {
    const templatePath = path.join('./projects', templateName);
    try {
      await stat(templatePath);
    } catch (error) {
      this.logger.error(`Template ${templateName} not found`);
      return null;
    }

    const TemplateFile = await import(templatePath).catch(err => {
      this.logger.log(err);
    })
    const SelectedTemplate = TemplateFile.default

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      <CacheProvider value={cache} >
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <SelectedTemplate props={props} />
        </ThemeProvider>
      </CacheProvider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    return (
      <html>
        <head>
          <title>My page</title>
          ${emotionCss}
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    )
  }
}
