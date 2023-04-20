import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

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

  await app.listen(5000);
}
bootstrap();
