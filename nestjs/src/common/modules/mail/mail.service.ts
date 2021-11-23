import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }

  async sendUserConfirmation() {
    const template = handlebars.compile('<div>{{name}}</div>');
    const htmlToSend = template({ name: 'hello' });

    try {
      const result = await this.mailerService.sendMail({
        to: 'giangd@gmail.com',
        from: 'support@checkin.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        html: htmlToSend,
      });

      return result;
    } catch (err) {
      this.logger.error(`Failed to send confirmation email`);
    }
  }
}
