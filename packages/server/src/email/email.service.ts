import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses';

@Injectable()
export class EmailService {
  private readonly client = ses.createClient({} as any);

  @SqsMessageHandler(/** name: */ 'notification queue', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
    const msg: EmailMessage = JSON.parse(message.Body) as EmailMessage;
    // Give SES the details and let it construct the message for you.
    this.client.sendEmail(msg, function (err, data, res) {
      // console.log(res);
    });
  }

  @SqsConsumerEventHandler(/** name: */ 'notification queue', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}

interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  message: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}
