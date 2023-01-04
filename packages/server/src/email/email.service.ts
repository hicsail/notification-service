import { Logger, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses';
import * as AWS from 'aws-sdk';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Email } from './validator/emailValidator.dto';

@Injectable()
export class EmailService {
  private readonly client = ses.createClient({} as any);
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
  public async sendEmail(msg: Email): Promise<ses.SendEmailData> {
    msg.from = msg.from || 'noreply@email.sail.codes';
    const email = plainToInstance(Email, msg);
    const errors = await this.isCompliantFormat(email);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return new Promise((resolve, reject) => {
      this.client.sendEmail(msg, (err, data) => {
        if (err) {
          this.logger.error('AWS Error', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  @SqsMessageHandler(/** name: */ 'notification queue', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message): Promise<void> {
    this.logger.log(`Message to be sent (type: ${typeof message}): ${message}, `);
    const email = plainToInstance(Email, message);
    await this.sendEmail(email);
  }

  @SqsConsumerEventHandler(/** name: */ 'notification queue', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message): void {
    this.logger.error(`Processing error: ${error}\tmessage: ${message}`);
  }
}
