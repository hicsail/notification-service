<p align="center">
 <img src="https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png" width="200" alt="SAIL Logo" /></a>
</p>

# How to create templates


## 📖 Prerequisites 
In order to run/develop this Microservice, your project needs the following packages installed:

```
    "node": "^14.15.0 || >=16.10.0",
    "@ssut/nestjs-sqs": "^1.3.0",
    "aws-sdk": "^2.1227.0",
    "dotenv": "^16.0.3",
    "sqs-producer": "^2.1.0",
    "uuid": "^9.0.0"
```


## 🖥️ Running the app

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


## 🧪 Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## ⚖️ LICENSE


## Frameworks


## Additional Scripts


## Resources


