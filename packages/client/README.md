<p align="center">
 <img src="https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png" width="200" alt="SAIL Logo" /></a>
</p>


# How to send emails

This client module lets you send emails and pick a template of your choice.

## 📖  Prerequisite

In order to run/develop this Microservice, your project needs the following packages installed:

```
    "node": "^14.15.0 || >=16.10.0",
    "aws-sdk": "^2.1227.0",
    "dotenv": "^16.0.3",
    "uuid": "^9.0.0"
```

## 💾 Installation

Please run the following command in terminal in your project directory.

```
npm i @bu-sail/notification-client
```
More info at bu-sail/notification-client: <a href="https://www.npmjs.com/package/@bu-sail/notification-client" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

## 🖥️ Usage

After installation you can use the module like the following example:

```
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
```

## 🚧 Development Guide


## 🤝 Contributing


## ⚖️ LICENSE


## Frameworks


## Additional Scripts


## Resources
