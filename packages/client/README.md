## How to send emails

Installation:

Please run the following command in your terminal.

```
npm i @bu-sail/notification-client
```

More info at bu-sail/notification-client: https://www.npmjs.com/package/@bu-sail/notification-client

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
