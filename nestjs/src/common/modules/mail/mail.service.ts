import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  async sendUserConfirmation() {
    const template = handlebars.compile('<div>{{name}}</div>');
    const htmlToSend = template({ name: 'hello' });

    return this.mailerService.sendMail({
      to: 'example@gmail.com',
      from: 'support@checkin.com',
      subject: 'Welcome to Nice App! Confirm your Email',
      html: htmlToSend
    });
  }
}
