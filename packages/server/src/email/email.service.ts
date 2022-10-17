import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as ses from 'node-ses';
import { validate } from 'class-validator';
import { mailbody } from './validator/CustomEmailValidator_server';
import { Validate, Length, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { CustomEmailArray } from './validator/CustomEmailArray';

@Injectable()
export class EmailService {
  private readonly client = ses.createClient({} as any);
  @IsEmail({ message: 'You need a proper email address' })
  from: string;

  @IsEmail()
  to: string;

  @Length(0, 50, { message: 'Subject body cannot exceed 50 chars' })
  subject: string;

  @Length(0, 1000, { message: 'Message body cannot exceed 1000 chars' })
  message: any;

  @IsEmail({ message: 'You need a proper email address' })
  replyTo?: string;

  @Validate(CustomEmailArray, { message: 'Check your cc is all address' })
  @IsArray()
  cc?: string[];

  @Validate(CustomEmailArray, { message: 'Check your bcc is all address' })
  @IsArray()
  bcc?: string[];

  @SqsMessageHandler(/** name: */ 'notification queue', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
    const msg = JSON.parse(message.Body);
    this.from = msg.from;
    this.to = msg.to;
    this.subject = msg.subject;
    this.message = msg.message;
    this.replyTo = msg.replyTo ? msg.replyTo : null;
    this.cc = msg.cc ? msg.cc : null;
    this.bcc = msg.bcc ? msg.bcc : null;

    validate(this, { skipMissingProperties: true }).then((res) => {
      if (res.length > 0) console.log(res);
      else {
        console.log('pass');
        // const msg: EmailMessage = JSON.parse(message.Body) as EmailMessage;
        // Give SES the details and let it construct the message for you.
        this.client.sendEmail(this, function (err, data, res) {
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
