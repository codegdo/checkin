import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Expiry', 'X-Auth-Token'],
    exposedHeaders: ['Authorization ', 'Expiry', 'X-Auth-Token'],
  });
  /* app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  ); */
  await app.listen(5000);
}
bootstrap();
