import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';

@Module({
  providers: [TemplatesService],
  controllers: [TemplatesController],
  exports: [TemplatesService]
})
export class TemplatesModule {}
