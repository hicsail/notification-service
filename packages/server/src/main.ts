import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

async function bootstrap() {
  dotenv.config();

  let serviceConfigOptions: ServiceConfigurationOptions = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    endpoint: process.env.LOCAL_QUEUE_URL
  };

  AWS.config.update(serviceConfigOptions);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription('The notifications microservice provides a common abstraction layer on top of the various notification types and actual sending.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
