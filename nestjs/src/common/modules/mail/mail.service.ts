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

  async sendUserConfirmation() {
    try {
      const template = handlebars.compile('<div>{{name}}</div>');
      const htmlToSend = template({ name: 'hello' });
      const signupEmail = await this.emailRepository.getSingupEmail();
      console.log('SIGNUP EMAIL', signupEmail);

      const result = await this.mailerService.sendMail({
        to: 'giangd@gmail.com',
        from: 'support@checkin.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        html: htmlToSend,
      });

      return result;
    } catch (err) {
      this.logger.error(`Failed to send confirmation email`, err);
    }
  }
}
