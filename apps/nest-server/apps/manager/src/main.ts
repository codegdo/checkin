import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ManagerModule } from './manager.module';
import { ConfigService } from '@nestjs/config';
import { PrefixService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ManagerModule);
  const configService = app.get(ConfigService);

  const globalPrefixService = app.get(PrefixService);

  // Set the global prefix using the custom service
  globalPrefixService.setGlobalPrefix('manager');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get<number>('MANAGER_PORT'),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
