import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
//import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Email } from './validator/email.dto';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class EmailService {
  constructor(private readonly templateService: TemplatesService) {}

  private readonly client = new AWS.SES();
  private readonly logger = new Logger(EmailService.name);

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
    return this.sendToSES(email);
  }

  private async sendToSES(email: Email): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.sendEmail(
        {
          Destination: {
            ToAddresses: email.to,
            CcAddresses: email.cc,
            BccAddresses: email.bcc
          },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: email.renderedTemplate
              },
              Text: {
                Charset: 'UTF-8',
                Data: email.message
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: email.subject
            }
          },
          ReplyToAddresses: [email.replyTo],
          Source: email.from
        },
        (err, data) => {
          if (err) {
            this.logger.error(`Error sending email: ${err}`);
            return reject(err);
          }
          this.logger.log(`Email sent: ${data}`);
          return resolve(true);
        }
      );
    });
  }

  //@SqsMessageHandler(/** name: */ 'notification queue', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message): Promise<void> {
    this.logger.log(`Message to be sent (type: ${typeof message}): ${message}, `);
    const email = plainToInstance(Email, message);
    await this.sendEmail(email);
  }

  //@SqsConsumerEventHandler(/** name: */ 'notification queue', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message): void {
    this.logger.error(`Processing error: ${error}\tmessage: ${message}`);
  }
}
