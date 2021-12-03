import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handlebars from 'handlebars';
import { EmailRepository } from 'src/models/main/repositories';

type SendSignupEmailData = {
  to: string;
  name: string;
  username: string;
  url: string;
}

@Injectable()
export class MailService {
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
      const emails = await this.emailRepository.getSingupEmail();

      emails.forEach(email => {
        const template = handlebars.compile(email.body);
        const htmlToSend = template(data);

        this.mailerService.sendMail({
          from: {
            name: email.sendName,
            address: email.sendFrom
          },
          to: [
            {
              name: (email.type === 'R' ? this.system.name : data.name),
              address: (email.type === 'R' ? email.recipients : data.to)
            }
          ],
          cc: email.ccRecipients,
          bcc: email.bccRecipients,
          subject: email.subject,
          html: htmlToSend
        });

      });

    } catch (err) {
      this.logger.error(`${err.message}`, err);
    }
  }
}
