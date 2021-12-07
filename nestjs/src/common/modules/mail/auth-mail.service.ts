import fs = require('fs');
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handlebars from 'handlebars';

import { appConfig } from 'src/configs';
import { EmailRepository } from 'src/models/main/repositories';

type SendSignupEmailData = {
  to: string;
  name: string;
  username: string;
  url: string;
}

@Injectable()
export class AuthMailService {
  private appName = process.env.APP_NAME;
  private system = {
    name: 'Codegdo',
    address: 'system@codegdo.com'
  };

  private support = {
    name: 'Codegdo',
    address: 'support@codegdo.com'
  };

  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(EmailRepository)
    private emailRepository: EmailRepository,

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }

  async sendSignupEmail(data: SendSignupEmailData) {
    try {

      //const senderStream = fs.createReadStream(join(__dirname, '/asset/emails/base/auth/signup-sender.html'));
      //const receiverStream = fs.createReadStream(join(__dirname, '/asset/emails/base/auth/signup-receiver.html'));

      const list = await this.emailRepository.getSingupEmail();
      const { S: sender, R: receiver } = list.reduce((email, i) => { return { ...email, [i.type]: i } }, {});

      const htmlSender = handlebars.compile(sender?.body || '')(data);
      const htmlReceiver = handlebars.compile(receiver?.body || '')(data);

      // TO SENDER
      this.mailerService.sendMail({
        from: {
          name: `${this.appName} ${sender.fromName}`,
          address: sender.fromAddress
        },
        to: {
          name: data.name,
          address: data.to
        },
        subject: sender.subject,
        html: htmlSender
      });

      // TO RECEIVER
      this.mailerService.sendMail({
        from: {
          name: `${this.appName} ${receiver.fromName}`,
          address: receiver.fromAddress
        },
        to: {
          name: receiver.groupName,
          address: receiver.recipients
        },
        cc: receiver.ccRecipients,
        bcc: receiver.bccRecipients,
        subject: receiver.subject,
        html: htmlReceiver
      });

    } catch (err) {
      this.logger.error(`${err.message}`, err);
    }
  }
}
