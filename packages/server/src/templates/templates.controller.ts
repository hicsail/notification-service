import { Body, Controller, HttpException, Param, Post, HttpStatus } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templateService: TemplatesService) {}

  /**
   * Get a template by name.
   *
   * The template name supports folder structure where the param is URL
   * encoded. (NestJS automatically decodes the param).
   *
   * @param templateName The name of the template to get.
   */
  @Post('/preview/:templateName')
  async postTemplate(@Param('templateName') templateName: string, @Body() body: any): Promise<any> {
    const template = await this.templateService.getTemplate(templateName, body);

    if (template === null) {
      throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
    }
    return template;
  }
}
