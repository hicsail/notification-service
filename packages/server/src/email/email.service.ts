import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses';
import { validate } from 'class-validator';
import { mailbody } from './validator/CustomEmailValidator_server';

@Injectable()
export class EmailService {
  private readonly client = ses.createClient({} as any);

  @SqsMessageHandler(/** name: */ 'notification queue', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
    const msg = JSON.parse(message.Body);
    const msg_to_validate = new mailbody();
    msg_to_validate.from = msg.from;
    msg_to_validate.to = msg.to;
    msg_to_validate.subject = msg.subject;
    msg_to_validate.message = msg.message;
    msg_to_validate.replyTo = msg.replyTo ? msg.replyTo : null;
    msg_to_validate.cc = msg.cc ? msg.cc : null;
    msg_to_validate.bcc = msg.bcc ? msg.bcc : null;

    validate(msg_to_validate, { skipMissingProperties: true }).then((res) => {
      if (res.length > 0) console.log(res);
      else {
        console.log('pass');
        // const msg: EmailMessage = JSON.parse(message.Body) as EmailMessage;
        // Give SES the details and let it construct the message for you.
        this.client.sendEmail(msg_to_validate, function (err, data, res) {
          if (err) console.log(err);
        });
      }
    });
  }

  @SqsConsumerEventHandler(/** name: */ 'notification queue', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}
