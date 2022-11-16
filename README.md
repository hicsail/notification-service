
![image](https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png)



# NOTIFICATION-SERVICE

This paclage provides is a Microservice that lets you create email templates, queue your email on AWS SQS, and send the email through AWS SES.

## Prerequisite

In order to run/develop this Microservice, your project needs the following packages installed:

```
    "node": "^14.15.0 || >=16.10.0",
    "@ssut/nestjs-sqs": "^1.3.0",
    "aws-sdk": "^2.1227.0",
    "dotenv": "^16.0.3",
    "sqs-producer": "^2.1.0",
    "uuid": "^9.0.0"
```

## For users

If you wish to use the notification service, please proceed to:

https://github.com/hicsail/notification-service/tree/readMe/packages/client

and follow the instruction.


## For developers

If you wish to create a new Email Template, please proceed to:

https://github.com/hicsail/notification-service/tree/readMe/packages/server/src/templates

and follow the guideline

Please make sure to run everytime you push to the repository.

```
npm run prettier:fix
npm run lint:fix
```

