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
    try {
      return await this.templateService.getTemplate(templateName, body);
    } catch (e) {
      throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
    }
  }
}
