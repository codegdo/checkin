import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
//import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import handlebars from 'handlebars';

@Injectable()
export class MailService {
  //private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly mailerService: MailerService,

    //@InjectPinoLogger(MailService.name)
    //private readonly logger: PinoLogger

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }

  async sendUserConfirmation() {
    const template = handlebars.compile('<div>{{name}}</div>');
    const htmlToSend = template({ name: 'hello' });

    try {
      const result = await this.mailerService.sendMail({
        to: 'example@gmail.com',
        from: 'support@checkin.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        html: htmlToSend
      });

      return result;
    } catch (err) {

      this.logger.error(`Failed to send confirmation email`);
    }
  }
}
