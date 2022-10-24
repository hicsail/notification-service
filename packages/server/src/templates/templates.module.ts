import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';

@Module({
  imports: [HttpModule],
  providers: [TemplatesService],
  controllers: [TemplatesController]
})
export class TemplatesModule { }
