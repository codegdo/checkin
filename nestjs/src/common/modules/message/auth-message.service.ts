import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { MailerService } from '@nestjs-modules/mailer';
import handlebars from 'handlebars';

import { EmailRepository } from 'src/models/main/repositories';
import { arrayToObjectKey } from 'src/common/utils/array-to-object-keys.util';
import { EmailData } from 'src/models/main/email/email.dto';
import { TokenData } from 'src/models/main/token/token.dto';

export enum MessageType {
  MESSAGE = 'message',
  EMAIL = 'email',
}

export type MessageOptions<T> = {
  type: MessageType;
  content: T;
};

type VerifyData = {
  username: string;
  phoneNumber: string;
  emailAddress: string;
};

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
  ) {}

  async sendVerifyMessage(
    messageOptions: MessageOptions<TokenData<VerifyData>>,
  ): Promise<{ ok: boolean }> {
    const { type, content } = messageOptions;
    const { key, data } = content;

    try {
      const emails = await this.emailRepository.getEmailByName('verify');

      const { S: sendEmail } = arrayToObjectKey<{ S: EmailData; R: EmailData }>(
        {
          key: 'type',
          values: emails,
        },
      );

      if (sendEmail) {
        if (type == MessageType.MESSAGE) {
          const message = sendEmail?.message || '';
          const body = handlebars.compile(message)({ key });

          this.client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: data?.phoneNumber,
          });
        }

        if (type == MessageType.EMAIL) {
          const body = sendEmail?.body || '';
          const html = handlebars.compile(body)({ key, ...data });

          this.mailerService.sendMail({
            from: {
              name: `${this.appName} ${sender.fromName}`,
              address: sendEmail.fromAddress,
            },
            to: {
              name: data.name,
              address: data.emailAddress,
            },
            subject: sendEmail.subject,
            html,
          });
        }

        return { ok: true };
      }
    } catch (err) {
      this.logger.error(`${err.message}`, err);
      throw new InternalServerErrorException(500, err.code);
    }
  }
}
