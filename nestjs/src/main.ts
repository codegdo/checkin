import { NestFactory } from '@nestjs/core';
import * as expressWinston from 'express-winston';
//import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { logger } from './middlewares';

//dotenv.config();

async function bootstrap() {

  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, { logger });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Expiry', 'X-Api-Token'],
    exposedHeaders: ['Authorization ', 'Expiry', 'X-Api-Token'],
  });

  app.use(
    expressWinston.logger({
      winstonInstance: logger
    })
  );

  await app.listen(5000);
}
bootstrap();
