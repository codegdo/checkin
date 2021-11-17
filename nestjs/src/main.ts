import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as session from 'express-session';
import * as expressWinston from 'express-winston';
import * as Transport from 'winston-transport';
import WinstonTransport from './common/utils/transport.util';

export default class PgTransport extends Transport {
  private detail;

  constructor(connection) {
    super(connection);
    this.detail = {};
  }

  private async insert() {
    //console.log('CONNECTION', await getConnection().getRepository(Token).find());
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Perform the writing to the remote service
    //this.insert();

    this.detail = { ...this.detail, ...info };

    console.log(this.detail);

    callback();
  }
}


async function bootstrap() {

  const logger = winston.createLogger({
    exitOnError: false,
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: winston.format.json()
      }),
      new winston.transports.Http({
        level: 'warn',
        format: winston.format.json()
      }),
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new WinstonTransport()
    ]
  });

  const app = await NestFactory.create(AppModule, { logger });

  //const app = await NestFactory.create(AppModule);

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
