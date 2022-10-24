import React from 'react';
import { Controller, Get } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templateService: TemplatesService) {}

  @Get('/')
  getTemplate(): any {
    return this.templateService.getTemplate();
  }
}
