import * as dotenv from 'dotenv'
import { Producer } from 'sqs-producer';

dotenv.config()

export class NotificationClient {
  private readonly producer = Producer.create({
                                queueUrl: process.env.SQS_QUEUE_URL,
                                region: process.env.AWS_REGION
                              });

  public async sendmessage(msg:EmailMessage, delaySeconds=5) {
    await this.producer.send([
      { id: 'id1',
        body: JSON.stringify(msg),
        delaySeconds: delaySeconds
      }]);
  }
}

var msg = {from: 'test@email.sail.codes',
            to : 'hishii@bu.edu',
            subject : "Greetings",
            message : "Hello World",
            altText: 'plain text'
           }
var delaySeconds = 3
const client = new NotificationClient
client.sendmessage(msg, delaySeconds);


interface EmailMessage< T= any> {
  from: string;
  to: string;
  subject: string;
  message: T;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}