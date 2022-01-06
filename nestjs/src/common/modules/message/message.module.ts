import { Global, Logger, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from 'nestjs-twilio';

import { EmailRepository } from 'src/models/main/repositories';
import { MessageAuthService } from './message-auth.service';
import { ErrorService } from '../error/error.service';


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [EmailRepository],
      'default',
    ),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return configService.get('mailer')();
      },
      inject: [ConfigService]
    }),
    TwilioModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('twilio'),
      inject: [ConfigService],
    }),
  ],
  providers: [MessageAuthService, ErrorService],
  exports: [MessageAuthService]
})
export class MessageModule { }
