import { Logger, Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Email } from './validator/CustomEmailValidator_server';

@Injectable()
export class EmailService {
  private readonly client = ses.createClient({} as any);
  private readonly logger = new Logger(EmailService.name);

  public async IsCompliantFormat(msg: Email) {
    return validate(msg, { skipMissingProperties: true });
  }

  public sendEmail(msg: Email): Promise<ses.SendEmailData> {
    // Give SES the details and let it construct the message for you.
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
  public async handleMessage(message: AWS.SQS.Message) {
    this.logger.log('Message to be sent: ', message);
    const msg = JSON.parse(message.Body);
    const email = plainToClass(Email, msg);

    const check = await this.IsCompliantFormat(email);
    if (check.length === 0) {
      await this.sendEmail(email);
      this.logger.log('The email was successfully sent');
    } else {
      this.logger.error('Format Validation Error', check);
    }
  }

  @SqsConsumerEventHandler(/** name: */ 'notification queue', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}
