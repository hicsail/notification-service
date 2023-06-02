import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  private readonly logger = new Logger(TemplatesController.name);

  constructor(private readonly templateService: TemplatesService) {}

  /**
   * List all templates.
   */
  @Get()
  async getTemplates(): Promise<string[]> {
    this.logger.log("Getting templates")
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
      this.logger.log("Posting a template")
      return await this.templateService.getTemplate(templateName, body);
    } catch (e) {
      throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Preview a template by name without data
   */
  @Get('/preview/:templateName')
  async getTemplate(@Param('templateName') templateName: string): Promise<any> {
    try {
      this.logger.log("Previewing a template")
      return await this.templateService.getTemplate(templateName, {});
    } catch (e) {
      this.logger.error(e);
      throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
    }
  }
}
