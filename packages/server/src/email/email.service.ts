import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Email } from './validator/email.dto';
import { TemplatesService } from '../templates/templates.service';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import mailgunTransport from 'nodemailer-mailgun-transport';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: Transporter;

  constructor(private readonly templateService: TemplatesService, private readonly config: ConfigService) {
    this.transporter = createTransport(
      mailgunTransport({
        auth: {
          apiKey: this.config.get<string>('MAILGUN_API_KEY'),
          domain: this.config.get<string>('MAILGUN_DOMAIN', 'mail.sail.codes')
        }
      })
    );
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
    msg.from = msg.from || 'noreply@mail.sail.codes';
    const email = plainToInstance(Email, msg);
    const errors = await this.isCompliantFormat(email);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    if (email.template) {
      email.renderedTemplate = await this.templateService.getTemplate(email.template, email.templateData);
    }
    this.logger.log("Sending email")
    return this.sendViaNodeMailer(email);
  }

  private async sendViaNodeMailer(email: Email): Promise<boolean> {
    this.logger.log(`Sending email to ${email.to}`);
    const info = await this.transporter.sendMail({
      from: email.from,
      to: email.to,
      cc: email.cc,
      bcc: email.bcc,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.message,
      html: email.renderedTemplate
    });
    this.logger.log(JSON.stringify(info, null, 2));
    return true;
  }
}
