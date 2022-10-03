import dotenv from 'dotenv'
import AWS from 'aws-sdk';
const dir= '/Users/hicadmin/Desktop/Project_MicroService/notification-service/src/'
dotenv.config({path:dir+'.env'});
AWS.config.update({region: process.env.AWS_REGION});

export default function sendmessage(MessageBody) {
    // Create an SQS service object
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

    var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "Author": {
          DataType: "String",
          StringValue: "John Grisham"
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: "6"
        }
      },
      // MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      MessageBody: MessageBody,
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: SQS_QUEUE_URL
    };

    sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      });
}