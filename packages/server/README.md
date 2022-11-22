<p align="center">
 <img src="https://user-images.githubusercontent.com/62607343/202245103-044d5c0b-7dec-416b-a178-66b4875dc399.png" width="200" alt="SAIL Logo" /></a>
</p>


## 📖 Prerequisites 
In order to develop and run the server code locally, you need the following development dependecies:

```
    "@nestjs/cli": "^9.0.0",
    "@nestjs/schematics": "^9.0.0",
    "@nestjs/testing": "^9.0.0",
    "@types/aws-lambda": "^8.10.106",
    "@types/express": "^4.17.13",
    "@types/jest": "28.1.8",
    "@types/node": "^16.0.0",
    "@types/react": "^18.0.24",
    "@types/react-dom": "^18.0.8",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "28.1.3",
    "prettier": "^2.3.2",
    "serverless-jetpack": "^0.11.1",
    "serverless-offline": "^11.0.1",
    "source-map-support": "^0.5.20",
    "supertest": "^6.1.3",
    "ts-jest": "28.0.8",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "4.1.0",
    "typescript": "^4.7.4"
```

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
