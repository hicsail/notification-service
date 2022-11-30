import { Logger, Injectable } from '@nestjs/common';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import theme from './projects/common/theme';
import createEmotionCache from './projects/common/createEmotionCache';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  /**
   * Get the template based on the given name.
   *
   * Will return null if the template is not found.
   */
  async getTemplate(templateName: string, props: any): Promise<any> {
    // Get the template file
    const SelectedTemplate = await this.importTemplate(templateName);
    if (SelectedTemplate === null) {
      return null;
    }

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

  /**
   * Helper function which handles the dynamic import of the correct template.
   * Returns null if the template with the given name is not found.
   *
   * Supports folder structure.
   *
   * @param templateName The name of the template to import
   */
  private async importTemplate(templateName: string): Promise<any> {
    try {
      const mod = await import('./projects/'+ templateName);
      return mod.default;
    } catch (error) {
      this.logger.debug(`Template ${templateName} not found`);
      return null;
    }
  }
}
