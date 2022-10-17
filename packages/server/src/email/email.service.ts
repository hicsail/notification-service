import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses';
import { validate } from 'class-validator';
import { Email } from './validator/CustomEmailValidator_server';

@Injectable()
export class EmailService {
  private readonly client = ses.createClient({} as any);

  public async IsCompliantFormat(msg: Email) {
    validate(msg, { skipMissingProperties: true }).then((res) => {
      return res.length === 0;
    });
  }

  public sendEmail(msg: Email) {
    // const msg: EmailMessage = JSON.parse(message.Body) as EmailMessage;
    // Give SES the details and let it construct the message for you.
    this.client.sendEmail(msg, function (err, data, res) {
      if (err) console.log(err);
    });
  }

  @SqsMessageHandler(/** name: */ 'notification queue', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
    const msg = JSON.parse(message.Body);
    const check = this.IsCompliantFormat(msg);
    if (check) {
      console.log('Pass');
      this.sendEmail(msg);
    }
  }

  @SqsConsumerEventHandler(/** name: */ 'notification queue', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}
