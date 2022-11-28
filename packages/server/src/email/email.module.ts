import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SqsModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [{ name: 'notification queue', queueUrl: configService.get('SQS_QUEUE_URL') }]
        };
      }
    })
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
