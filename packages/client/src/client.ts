import * as dotenv from 'dotenv'
import { Producer } from 'sqs-producer';
import { validate } from './validator/CustomEmailValidator_client';
import { v4 as uuidv4 } from 'uuid';
dotenv.config()

export class NotificationClient {
  private readonly producer = Producer.create({
                                queueUrl: process.env.SQS_QUEUE_URL,
                                region: process.env.AWS_REGION
                              });

  public async sendmessage(msg:object, delaySeconds=5) {
    const formattedEmail = await validate(msg);
    const id = uuidv4()
    await this.producer.send([
      { id,
        delaySeconds,
        body: JSON.stringify(formattedEmail)
      }]);
  }
}

var msg = {from: 'test@email.sail.codes',
            to : 'hishii@bu.edu',
            subject : 123,
            message : "Hello World",
            altText: 'plain text',
            cc:['hishii@bu.edu','hishii@bu.edu']
           }
var delaySeconds = 3
const client = new NotificationClient()
client.sendmessage(msg, delaySeconds);