import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templateService: TemplatesService) {}

  /**
   * List all templates.
   */
  @Get()
  async getTemplates(): Promise<string[]> {
    return this.templateService.getTemplates();
  }

  /**
   * Preview a template by name.
   *
   * The template name supports folder structure where the param is URL
   * encoded. (NestJS automatically decodes the param).
   *
   * @param templateName The name of the template to get.
   * @param body The data to render the template with.
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
