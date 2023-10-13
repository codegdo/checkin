import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ManagerModule } from './manager.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ManagerModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('MANAGER_HOST'),
      port: configService.get<number>('MANAGER_PORT'),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
