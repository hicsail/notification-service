import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { EmailService } from './email.service';
import * as AWS from 'aws-sdk';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() message: AWS.SQS.Message): Promise<void> {
    try {
      this.emailService.handleMessage(message);
    } catch (e) {
      console.log(e);
    }
  }
}
