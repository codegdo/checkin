import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/helpers';

@Injectable()
export class WebhookService {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }

  async handleIncomingStripeEvent(signature: string, payload: Buffer) {
    //this.paymentService.
    console.log(signature);
  }
}
