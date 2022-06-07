import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as expressWinston from 'express-winston';

import { AppModule } from './app.module';
import { createLogger } from './middlewares';

async function bootstrap() {

  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = createLogger(configService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Expiry', 'X-Api-Token'],
    exposedHeaders: ['Authorization ', 'Expiry', 'X-Api-Token'],
  });

  app.useLogger(logger);
  app.use(
    expressWinston.logger({
      winstonInstance: logger
    })
  );

  await app.listen(5000);
}
bootstrap();
