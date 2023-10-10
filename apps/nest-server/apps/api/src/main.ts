import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    rawBody: true,
    snapshot: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('API_PORT');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

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
