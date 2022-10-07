import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses'

@Injectable()
export class EmailService {
  @SqsMessageHandler(/** name: */ 'test', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
    const msg = JSON.parse(message.Body);
    console.log(msg);

  // Create SES client
    var client = ses.createClient({} as any);
  // Give SES the details and let it construct the message for you.
    client.sendEmail({
      from: 'test@email.sail.codes',
      subject: 'Greetings',
      message: 'Hello',
      altText: 'plain text',
      to: 'hishii@bu.edu'
    }, function (err, data, res) {
        console.log(res);
    });
  }

  @SqsConsumerEventHandler(/** name: */ 'test', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}

export interface SesEmailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  html?: string;
  cc?: string;
  bcc?: string[];
  text?: string;
}
