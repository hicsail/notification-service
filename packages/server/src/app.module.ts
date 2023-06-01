import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './templates/templates.module';
import { TelemetryModule } from './telemetry/telemetry.module';

// SESModule,
@Module({
  imports: [EmailModule, HealthModule, TemplatesModule, ConfigModule.forRoot({ isGlobal: true }), TelemetryModule]
})
export class AppModule {}
