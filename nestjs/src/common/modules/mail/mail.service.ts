import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handlebars from 'handlebars';
import { EmailRepository } from 'src/models/main/repositories';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(EmailRepository)
    private emailRepository: EmailRepository,

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }

  private async send({ to, from, subject, html }) {
    return this.mailerService.sendMail({
      to,
      from,
      subject,
      html,
    });
  }

  async sendSignupEmail(email, username, url) {
    try {
      const emails = await this.emailRepository.getSingupEmail();

      emails.forEach(email => {

        // SENDER
        if (email.type === 'S') {
          console.log(email.body);
        }

        // RECEIVER
        if (email.type === 'R') {
          console.log(email.body);
        }

      });


      const template = handlebars.compile('<div>{{name}}</div>');
      const htmlToSend = template({ name: 'hello' });

      const result = await this.mailerService.sendMail({
        to: 'giangd@gmail.com',
        from: 'support@checkin.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        html: htmlToSend,
      });

      return result;


    } catch (err) {
      this.logger.error(`${err.message}`, err);
    }
  }
}
