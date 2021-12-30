import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { MailerService } from '@nestjs-modules/mailer';
import handlebars from 'handlebars';

import { EmailRepository } from 'src/models/main/repositories';
import { arrayToObjectKey } from 'src/common/utils/array-to-object-keys.util';
import { EmailData } from 'src/models/main/email/email.dto';

@Injectable()
export class AuthMessageService {
  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(EmailRepository)
    private emailRepository: EmailRepository,

    @Inject(Logger)
    private readonly logger: LoggerService,

    @InjectTwilio()
    private readonly client: TwilioClient,

  ) { }

  async sendVerifyMessage() {
    try {
      const emails = await this.emailRepository.getVerifyEmail();
      const { S: sender } = arrayToObjectKey<{ S: EmailData, R: EmailData }>({ key: 'type', values: emails });

      if (sender) {
        console.log(sender);
      }

    } catch (err) {
      this.logger.error(`${err.message}`, err);
    }
  }
}
