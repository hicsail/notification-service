import { Controller, Get } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templateService: TemplatesService) { }

  @Get('/')
  getTemplate(): any {
    const templateName = 'passwordReset';
    return this.templateService.getTemplate(templateName);
  }
}
