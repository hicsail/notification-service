import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SqsModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [{ name: 'test', queueUrl: configService.get('SQS_QUEUE_URL') }],
        };
      },
    }),
  ],
  providers: [EmailService],
})
export class EmailModule{}