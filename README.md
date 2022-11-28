<p align="center">
 <img src="https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png" width="200" alt="SAIL Logo" /></a>
</p>



# NOTIFICATION-SERVICE

This is a notification microservice that lets you create email templates, queue your email on AWS SQS, and send the email to users of your applications through AWS SES.


## Packages
<li> <a href="https://github.com/hicsail/notification-service/tree/readMe/packages/server/src/email"> Email Notification Service </a>
<li> <a href="https://github.com/hicsail/notification-service/tree/readMe/packages/server/src/templates"> Email Template Service </a>
<li> <a href="https://github.com/hicsail/notification-service/tree/readMe/packages/server/src/health">  Health Service </a>

## 📖 Prerequisite

1. First of all, please clone this repository into your local:

<pre>
git clone git@github.com:hicsail/notification-service.git
</pre>

2. In order to run/develop the cloned Microservice project, please ensure that your environment meets the following requirement:

<li> The notification service uses Node.js v16

3. In order to fetch all the required dependencies, please npm install at the root directory of the project

4. Please also create .env file in your project and configure the following environmental variables:
  
<pre>
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
SQS_QUEUE_URL =""
</pre>
  
## Installation

Please run the following in your command line at your desired directory

```
git clone git@github.com:hicsail/notification-service.git
```

## Devops URLs - TODO - Need deployment url, documentation url

## 🖥️ For users of the notification service in your project

If you wish to use the notification service in your project, please follow the link: <a href="https://github.com/hicsail/notification-service/tree/readMe/packages/client" target="_blank">➡️</a>


## 🚧 For developers who wishes to add Email templates

If you wish to add a new Email Template for your project, please follow the link:  <a href="https://github.com/hicsail/notification-service/tree/readMe/packages/server" target="_blank">➡️</a> 


## 🤝 Contributing -- TODO


## ⚖️ LICENSE -- TODO


## 📝 Resources

<li> NestJS: https://docs.nestjs.com/
<li> React: https://create-react-app.dev/docs/adding-typescript
<li> node js: https://nodejs.org/en/
<li> typescript: https://www.typescriptlang.org/
<li> nestjs-sqs: https://www.npmjs.com/package/@ssut/nestjs-sqs
<li> aws-sdk: https://aws.amazon.com/developer/tools/
<li> dotenv: https://www.npmjs.com/package/dotenv
<li> sqs-producer: https://www.npmjs.com/package/sqs-producer
<li> mui server rendering: https://mui.com/material-ui/guides/server-rendering/
