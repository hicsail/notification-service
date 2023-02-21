import { Injectable, Logger } from '@nestjs/common';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './common/theme';
import { deepReadDir } from '../util/deepread';
import inlineCss from 'inline-css';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  /**
   * Get a list of all template names
   */
  async getTemplates(): Promise<string[]> {
    const dir = __dirname + '/projects';
    return (await deepReadDir(dir))
      .flat()
      .filter((template) => {
        // Filter to only js files
        return template.endsWith('.js') && !template.endsWith('.d.tsx');
      })
      .map((template) => {
        //remove the .js extension and the dir path
        return template.split('/projects/')[1].replace('.js', '');
      });
  }

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

    const App = (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SelectedTemplate {...props} />
      </ThemeProvider>
    );

    const body = ReactDOMServer.renderToString(App);
    const html = `
      <html>
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </head>
        <body>
          <div id="root">${body}</div>
        </body>
      </html>`;
    return inlineCss(html, {
      url: 'required but not used'
    });
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
      const mod = await import('./projects/' + templateName);
      return mod.default;
    } catch (error) {
      this.logger.debug(`Template ${templateName} not found`);
      return null;
    }
  }
}
