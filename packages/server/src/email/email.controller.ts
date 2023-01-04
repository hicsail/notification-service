import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './validator/emailValidator.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() email: Email) {
    return this.emailService.sendEmail(email);
  }
}
