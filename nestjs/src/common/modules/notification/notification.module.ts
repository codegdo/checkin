import { Global, Logger, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from 'nestjs-twilio';

import { EmailRepository } from 'src/models/main/repositories';
import { AuthNotificationService } from './auth-notification.service';

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
  providers: [AuthNotificationService, Logger],
  exports: [AuthNotificationService]
})
export class NotificationModule { }
