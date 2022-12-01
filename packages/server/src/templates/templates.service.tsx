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
   * Get the rendered template based on the given template name.
   *
   * Will throw an error if the template is not found.
   */
  async getTemplate(templateName: string, props: any): Promise<string> {
    // Get the template file
    const SelectedTemplate = await this.importTemplate(templateName);
    if (SelectedTemplate === null) {
      throw new Error(`Template ${templateName} not found`);
    }

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    // Render the component to a string.
    const body = (
      <CacheProvider value={cache} >
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <SelectedTemplate props={props} />
        </ThemeProvider>
      </CacheProvider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(ReactDOMServer.renderToString(body));
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    return ReactDOMServer.renderToString(
      <html>
        <head>
          <title>My page</title>
          <style>{emotionCss}</style>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </head>
        <body>
          <div id="root">{body}</div>
        </body>
      </html>
    );
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
