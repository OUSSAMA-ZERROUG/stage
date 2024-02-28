import helmet from 'helmet';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.APP_PORT;
  if (!port) {
    throw new Error('PORT environment variable is not defined');
  }

  const app = await NestFactory.create(AppModule);

  //helmet is a middleware that adds security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  //validation pipe is a middleware that validates the body of the request
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist is used to remove the properties that are not defined in the DTO
      whitelist: true,
      //transform is used to transform the body of the request to the DTO (for example, if the body of the request is a string, it will be transformed to a number)
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors();

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('NODE_ENV', process.env.NODE_ENV);
}
bootstrap();
