import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get('CLIENT_HOST'),
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
