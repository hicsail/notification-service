<p align="center">
 <img src="https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png" width="200" alt="SAIL Logo" /></a>
</p>


## 📖 Prerequisites 

1. In order to run/develop the cloned Microservice project, please ensure that your environment meets the following requirement:

<ul><ul>
  <li> The notification service uses Node.js v16
</ul></ul>

2. Fetch all the required dependencies by npm install in the server directory

3. Please also create .env file in your project and configure the following environmental variables:
  
<pre>
SERVICE_NAME="notification-service"
MAILGUN_API_KEY=TEST_API_KEY #this needs to be replaced with an actual key to send an email
</pre>
## 🖥️ Running the server in your local

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## 🚧 Development Guide

Please create a new template inside the src/templates/projects directory  <a href="https://github.com/hicsail/notification-service/tree/readMe/packages/server/src/templates/projects" target="_blank">➡️</a>


You may reference this example as a starting point  <a href="https://github.com/hicsail/notification-service/blob/readMe/packages/server/src/templates/projects/passwordReset.tsx" target="_blank">➡️</a>


If you are wondering how this whole module works, the templates.service.tsx will fetch and wrap your new template 
https://github.com/hicsail/notification-service/blob/9d5a1b3fedae33c6b030ae70390bd98cd022c955/packages/server/src/templates/templates.service.tsx#L15


## 🎨 Code linting

✅ Before you push your changes to the repository, please remember to format your code.

```
npm run prettier:fix
npm run lint:fix
```

## Frameworks
<li> <a href="https://docs.nestjs.com/"> NestJS </a>
<li> <a href="https://create-react-app.dev/docs/adding-typescript/"> React </a>


## 🧪 Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Additional Scripts  -- TODO

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
