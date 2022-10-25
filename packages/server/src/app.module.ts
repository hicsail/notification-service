import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './templates/templates.module';
// SESModule,
@Module({
  imports: [EmailModule, HealthModule, TemplatesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
