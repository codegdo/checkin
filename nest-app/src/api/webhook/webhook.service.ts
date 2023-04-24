import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/helpers';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }

  async handleIncomingStripeEvent(signature: string, payload: Buffer) {
    try {
      const event = await this.paymentService.constructEvent(signature, payload);
      const data = event.data.object as Stripe.PaymentIntent;

      switch (event.type) {
        case 'payment_intent.created':
          this.paymentCreated(data);
          break;
        case 'payment_intent.succeeded':
          this.paymentSucceeded(data);
          break;
        case 'payment_intent.payment_failed':
          this.paymentFailed(data);
          break;
      }

    } catch (err) {
      console.log(err);
    }
  }

  private paymentCreated(data: Stripe.PaymentIntent) {
    // add your business logic here
    console.log('PAYMENT CREATED', data);
  }

  private paymentSucceeded(data: Stripe.PaymentIntent) {
    // add your business logic here
    console.log('PAYMENT SUCCESS', data);
  }

  private paymentFailed(data: Stripe.PaymentIntent) {
    // add your business logic here
    console.log('PAYMENT FAIL', data);
  }
}
