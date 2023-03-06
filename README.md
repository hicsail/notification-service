![Notification Service](https://user-images.githubusercontent.com/5147346/223198228-98d4aa43-7b1c-4b70-b204-d7b49b43c3d0.png)
# Notification Service

![Server Build Status](https://github.com/hicsail/notification-service/actions/workflows/server.yml/badge.svg)
![Client Build Status](https://github.com/hicsail/notification-service/actions/workflows/client.yml/badge.svg)


This microservice provides a simple and reliable way to send email notifications using an API that supports email delivery with templating. It can be integrated into any software system to provide consistent and customizable email notifications to users or other systems.

# Usage

## Sending an Email

To send an email, you need to submit a JSON payload to the microservice API endpoint. The required parameters for the payload are as follows:

- **to**: An array of email addresses for the recipients of the email.
- **subject**: The subject line of the email.
- **message**: The body of the email.
- **replyTo**: (Optional) An email address to which replies should be sent.
- **cc**: (Optional) An array of email addresses for the recipients of carbon copy (CC) of the email.
- **bcc**: (Optional) An array of email addresses for the recipients of blind carbon copy (BCC) of the email.

```js
fetch(notification_url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: ['recipient1@example.com', 'recipient2@example.com'],
    subject: 'New Email',
    message: 'Thanks for reading my email',
    replyTo: 'email inbox that is monitored', // optional
    cc: ['cc_recipient1@example.com', 'cc_recipient2@example.com'], // optional
    bcc: ['bcc_recipient1@example.com', 'bcc_recipient2@example.com'], // optional
  })
});
```

## Sending Templated Email

To send an email with a template, you need to remove the `message` parameter from the JSON payload and add the following parameters:

- **template**: The name of the email template to use. This should correspond to the name of the template file or identifier in the templating engine.
- **templateData**: An object containing the data to populate the template with. This should include all the necessary props that the template requires.

Here is an example of how to send a templated email using the microservice API:
```js
fetch(notification_url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: ['recipient1@example.com', 'recipient2@example.com'],
    subject: 'New Email',
    replyTo: 'email inbox that is monitored', // optional
    cc: ['cc_recipient1@example.com', 'cc_recipient2@example.com'], // optional
    bcc: ['bcc_recipient1@example.com', 'bcc_recipient2@example.com'], // optional
    template: 'auth/passwordReset',
    templateData: {} // props of the react template
  })
});
```

# Adding a New Email Template

The notification service uses React and MUI in order to render HTML templates. Please follow these steps to add a new template.

## 1. Prerequisites

The notification service is running on Node.js v16.

## 2. Install Dependencies

Before you can create a new template, you need to install the necessary dependencies. Open a terminal window and navigate to the packages/server directory. Then, run the following command:
```bash
  cd packages/server
  npm install
```

## 3. Create a New Template

In the `packages/server/src/templates/projects` folder, create a new folder for your project. Name the folder something descriptive that indicates what project is for (e.g. nist).

Inside your new project folder, create a new .tsx file that will act as your new template. For example, if you are creating a invite template, you might name the file invite.tsx.

In the .tsx file, import the necessary components and define the new template as a function component. You can use existing layout components to structure your template. Or create new reusable components.
```tsx
import {FC} from 'react';
import { BasicCard } from '../../layouts/basic-card'; // reusable layout component


export interface NewTemplateProps {
  // add any props needed for your template
}

export const newTemplate: FC<NewTemplateProps> = (props) => {
  return (
    <BasicCard>
      <>Your react template here</>
    </BasicCard>
    )
}
```

## Contributing

We welcome contributions to this notification microservice!

If you find a bug or have an idea for a new feature, please submit an issue or pull request on GitHub. We welcome contributions from the community to help improve this microservice for everyone.


## 📝 Resources

<li> NestJS: https://docs.nestjs.com/
<li> React: https://create-react-app.dev/docs/adding-typescript
<li> node js: https://nodejs.org/en/
<li> typescript: https://www.typescriptlang.org/
<li> aws-sdk: https://aws.amazon.com/developer/tools/
<li> mui server rendering: https://mui.com/material-ui/guides/server-rendering/
