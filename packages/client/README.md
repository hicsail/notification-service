# How to send emails

This client module lets you send emails and pick a template of your choice.

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

## Installation

Please run the following command in your terminal.

```
npm i @bu-sail/notification-client
```

More info at bu-sail/notification-client: https://www.npmjs.com/package/@bu-sail/notification-client

## Usage

After installation you can use the module like the following example:

```
import { NotificationClient } from "@bu-sail/notification-client"
var body =
{
        from: 'test@email.sail.codes',
        to: 'hishii@bu.edu',
        cc: [],
        bcc: ['harunsobuishii547@gmail.com'],
        subject: "Greetings",
        message: '123',
        altText: 'plain text'
}
var delaySeconds = 3
NotificationClient.sendmessage(JSON.stringify(body), delaySeconds);
```

Beware that cc and bcc takes array, rather than a single string.

## Development Guide
## Frameworks
## Tests
## Additional Scripts
