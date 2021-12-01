import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handlebars from 'handlebars';
import { EmailRepository } from 'src/models/main/repositories';

@Injectable()
export class MailService {
  private fromAddress = {
    name: 'Checkin',
    address: 'codegdo.checkin@gmail.com'
  };

  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(EmailRepository)
    private emailRepository: EmailRepository,

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }

  async sendSignupEmail(data) {
    try {
      const emails = await this.emailRepository.getSingupEmail();

      emails.forEach(email => {
        const template = handlebars.compile(email.body);
        const htmlToSend = template(data);

        this.mailerService.sendMail({
          from: this.fromAddress,
          to: [{ name: email.subject, address: (email.type === 'R' ? email.recipients : data.to) }],
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
