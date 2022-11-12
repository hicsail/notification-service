import { Body, Controller, Param, Post } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templateService: TemplatesService) {}

  @Post('/preview/:templateName')
  postTemplate(@Param('templateName') templateName: string, @Body() body: any): any {
    return this.templateService.getTemplate(templateName, body);
  }
}
