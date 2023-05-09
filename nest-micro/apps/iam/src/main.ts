import { NestFactory } from '@nestjs/core';
import { IamModule } from './iam.module';

async function bootstrap() {
  const app = await NestFactory.create(IamModule);
  await app.listen(5000);
}
bootstrap();
