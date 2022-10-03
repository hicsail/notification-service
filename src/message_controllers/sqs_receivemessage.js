import dotenv from 'dotenv'
import AWS from 'aws-sdk';
const dir= '/Users/hicadmin/Desktop/Project_MicroService/notification-service/src/'
dotenv.config({path:dir+'.env'});
AWS.config.update({region: process.env.AWS_REGION});


export default function receivemessage() {

    // Create an SQS service object
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    var SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

    var params = {
        AttributeNames: [
        "SentTimestamp"
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
        "All"
        ],
        QueueUrl: SQS_QUEUE_URL,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0
    };

    sqs.receiveMessage(params, function(err, data) {
        if (err) {
        console.log("Receive Error", err);
        } else if (data.Messages) {
        var deleteParams = {
            QueueUrl: SQS_QUEUE_URL,
            ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
            if (err) {
            console.log("Delete Error", err);
            } else {
            console.log("Message Deleted", data);
            }
        });
        }
    });
}