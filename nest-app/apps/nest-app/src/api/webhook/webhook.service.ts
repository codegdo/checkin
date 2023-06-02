import { Injectable } from '@nestjs/common';
import { BillingService } from '../billing/billing.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly billingService: BillingService
  ) { }

  async handleIncomingStripeEvent(signature: string, payload: Buffer) {
    try {
      const event = await this.billingService.constructEventFromWebhookSignature(signature, payload);
      const data = event.data.object;

      switch (event.type) {
        case 'checkout.session.completed':
          break;

        case 'customer.subscription.created':
          break;
        case 'customer.subscription.deleted':
          break;
        case 'customer.subscription.paused':
          break;
        case 'customer.subscription.resumed':
          break;
        case 'customer.subscription.trial_will_end':
          break;

        case 'payment_intent.created':
          this.billingService.paymentIntentCreated(data);
          break;
        case 'payment_intent.succeeded':
          this.billingService.paymentIntentSucceeded(data);
          break;
        case 'payment_intent.payment_failed':
          this.billingService.paymentIntentFailed(data);
          break;
        case 'invoice.payment.succeeded':
          break;
        case 'invoice.payment.failed':
          break;
      }

    } catch (err) {
      console.log(err);
    }
  }

}
