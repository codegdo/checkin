import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { MailerService } from '@nestjs-modules/mailer';
import handlebars from 'handlebars';

import { EmailRepository } from 'src/models/main/repositories';
import { arrayToObjectKey } from 'src/utils/array-to-object-keys.util';
import { EmailData } from 'src/models/main/email/email.type';
import { TokenData } from 'src/models/main/token/token.type';
import { MessageOptions, MessageEnum, VerifyEmailKey, VerifyMessageKey, VerifyTokenData } from './message.type';
import { LoggerService } from '../logger/logger.service';


@Injectable()
export class MessageAuthService {
  private appName = process.env.APP_NAME;

  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(EmailRepository)
    private emailRepository: EmailRepository,

    @InjectTwilio()
    private readonly client: TwilioClient,

    private readonly loggerService: LoggerService,
  ) { }

  async sendVerify(
    options: MessageOptions<TokenData<VerifyTokenData>>,
  ): Promise<{ ok: boolean }> {
    const { type, context } = options;
    const { key, data } = context;
    const { firstName, lastName, emailAddress, phoneNumber } = data;

    try {
      const emails = await this.emailRepository.getEmailByName('verify');

      const { S: send } = arrayToObjectKey<{ S: EmailData; R: EmailData }>(
        {
          key: 'type',
          values: emails,
        },
      );

      if (send) {

        const { subject, fromName, fromAddress, replyTo, body = '', message = '' } = send;

        if (type == MessageEnum.MESSAGE) {
          const keys: VerifyMessageKey = { key };
          const body = handlebars.compile(message)(keys);

          console.log(data);

          await this.client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
          });
        }

        if (type == MessageEnum.EMAIL) {
          const keys: VerifyEmailKey = { key, firstName, lastName, replyTo };
          const html = handlebars.compile(body)(keys);

          await this.mailerService.sendMail({
            from: {
              name: `${this.appName} ${fromName}`,
              address: fromAddress,
            },
            to: {
              name: `${firstName} ${lastName}`,
              address: emailAddress,
            },
            subject: subject,
            html,
          });
        }

        return { ok: true };
      }

    } catch (e) {
      this.loggerService.handleError(e);
    }
  }
}
