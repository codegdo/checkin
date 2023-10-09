import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env', // Load environment-specific .env file
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule { }
