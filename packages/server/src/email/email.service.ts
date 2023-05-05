import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Email } from './validator/email.dto';
import { TemplatesService } from '../templates/templates.service';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter;

  constructor(private readonly templateService: TemplatesService, private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.get('EMAIL_HOST', 'smtp.sail.codes'),
      port: config.get('EMAIL_PORT', 2500),
      secure: config.get('EMAIL_SECURE', false),
      auth: {
        user: config.get('EMAIL_USER', 'noreply'),
        pass: config.get('EMAIL_PASSWORD', 'password')
      }
    });
  }

  /**
   * Validate the format of the message
   * @param msg
   */
  public async isCompliantFormat(msg: Email): Promise<ValidationError[]> {
    return validate(msg, { skipMissingProperties: true });
  }

  /**
   * Send an email using AWS SES
   * @param msg
   */
  public async sendEmail(msg: Email): Promise<boolean> {
    msg.from = msg.from || 'noreply@email.sail.codes';
    const email = plainToInstance(Email, msg);
    const errors = await this.isCompliantFormat(email);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    if (email.template) {
      email.renderedTemplate = await this.templateService.getTemplate(email.template, email.templateData);
    }
    return this.sendViaNodeMailer(email);
  }

  private async sendViaNodeMailer(email: Email): Promise<boolean> {
    const info = await this.transporter.sendEmail({
      from: email.from,
      to: email.to,
      cc: email.cc,
      bcc: email.bcc,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.message,
      html: email.renderedTemplate
    });
    this.logger.log(`Email sent: ${info.messageId}`);
    return true;
  }
}
