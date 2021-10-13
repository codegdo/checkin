import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.get('mailer'),
      inject: [ConfigService]
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
