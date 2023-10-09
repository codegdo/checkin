import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
//import { Logger } from 'nestjs-pino';

import { VersioningType } from '@nestjs/common';
import { ApiModule } from './api.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
//import logger from '@app/common/logger/winston.logger';
//import { expressWinstonLogger, logger } from '@app/common/logger/winston.logger';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    rawBody: true,
    snapshot: true,
    //bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('API_PORT');

  //app.useLogger(app.get(Logger));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Configure express-winston
  //app.use(expressWinstonLogger);
  //app.useLogger(logger);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.enableCors({
    origin: configService.get<string>('CLIENT_URL'),
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Expiry',
      'X-Refresh-Token',
    ],
    //exposedHeaders: ['Authorization ', 'Expiry', 'X-Refresh-Token'],
  });

  await app.listen(port || 5000);
}
bootstrap();
