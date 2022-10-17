import * as dotenv from 'dotenv';
import { Producer } from 'sqs-producer';
import { validate } from './validator/CustomEmailValidator_client';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

export class NotificationClient {
  private readonly producer = Producer.create({
    queueUrl: process.env.SQS_QUEUE_URL,
    region: process.env.AWS_REGION
  });

  public async sendmessage(msg: object, delaySeconds = 5) {
    try {
      const formattedEmail = await validate(msg);
      const id = uuidv4();
      await this.producer.send([{ id, delaySeconds, body: JSON.stringify(formattedEmail) }]);
    } catch (error) {
      console.log(error);
      console.log('The email fomrat is invalid. Please review the above error message and resend again');
    }
  }
}
