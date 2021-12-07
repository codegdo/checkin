import { Global, Logger, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMailService } from './auth-mail.service';
import { EmailRepository } from 'src/models/main/repositories';

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
    })
  ],
  providers: [AuthMailService, Logger],
  exports: [AuthMailService]
})
export class MailModule { }
