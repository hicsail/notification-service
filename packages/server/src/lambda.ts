import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    const config = new DocumentBuilder()
      .setTitle('Notification Service')
      .setDescription('The notifications microservice provides a common abstraction layer on top of the various notification types and actual sending.')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    cachedServer = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
  }

  return cachedServer(event, context);
};
