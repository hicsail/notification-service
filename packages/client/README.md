<p align="center">
 <img src="https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png" width="200" alt="SAIL Logo" /></a>
</p>


# How to send emails

This client module lets you send emails and pick a template of your choice.

## 📖  Prerequisite

In order to run/develop this Microservice, your project needs the following packages installed:

<pre>
"dotenv": "^16.0.3",
"sqs-producer": "^2.1.0",
"yup": "^0.32.11"
</pre>

Please also create .env file in your project and configure the following environmental variables:
  
<pre>
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIAR7IMRMF74MFMOWEI"
AWS_SECRET_ACCESS_KEY="rSK9OOMPcU/+UNFggzKdoh3QEtTln5XB34pAhh1P"
SQS_QUEUE_URL ='https://sqs.us-east-1.amazonaws.com/135854645631/TestQueue'
</pre>

## 💾 Installation

Please run the following command in terminal in your project directory.

<pre>
npm i @bu-sail/notification-client
</pre>
More info at bu-sail/notification-client: <a href="https://www.npmjs.com/package/@bu-sail/notification-client" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

## 🖥️ Usage

After installation you can use the module like the following example:

<pre>
import { NotificationClient } from "@bu-sail/notification-client"
var body =
{
        from: 'xyz@gmail.com',
        to: 'xxx@zzz',
        cc: ['xxx@zzz', 'aaa@bbb'],
        bcc: ['xxx@zzz', 'aaa@bbb'],  ///Beware that cc and bcc takes array and can not be a single string
        subject: "Greetings",
        message: '123',
        altText: 'plain text'
}
var delaySeconds = 3
NotificationClient.sendmessage(JSON.stringify(body), delaySeconds);
</pre>

## Frameworks
<li> <a href="https://docs.nestjs.com/"> NestJS </a>


## Tests -- TODO


## Additional Scripts -- TODO


## 📝 Resources

<li> NestJS: https://docs.nestjs.com/
<li> node js: https://nodejs.org/en/
<li> typescript: https://www.typescriptlang.org/
<li> nestjs-sqs: https://www.npmjs.com/package/@ssut/nestjs-sqs
<li> aws-sdk: https://aws.amazon.com/developer/tools/
<li> dotenv: https://www.npmjs.com/package/dotenv
<li> sqs-producer: https://www.npmjs.com/package/sqs-producer
