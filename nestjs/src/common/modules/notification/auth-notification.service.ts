import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class AuthNotificationService {

  constructor(
    @InjectTwilio()
    private readonly client: TwilioClient
  ) { }

  async sendVerifyNotice(key, data) {
    try {
      return await this.client.messages.create({
        body: `${key}`,
        from: "+12052365504",
        to: `${data?.phoneNumber}`,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
