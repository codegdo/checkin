import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import * as util from 'util';

import { StripeService } from './stripe/stripe.service';

@Injectable()
export class BillingService {
  constructor(
    private readonly stripeService: StripeService,
  ) { }

  async constructEvent(signature: string, payload: Buffer) {
    return this.stripeService.constructEvent(signature, payload);
  }

  async createPaymentIntent(orderId: string, totalAmount: number,) {
    if (!orderId || totalAmount < 1) {
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }

    try {
      const paymentIntentParams = {
        amount: Number(totalAmount) * 100, // Total amount to be sent is converted to cents to be used by the Stripe API
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { orderId: orderId },
      };

      return await this.stripeService.createPaymentIntent(paymentIntentParams);
    } catch (error) {
      Logger.error(
        '[stripeService] Error creating a payment intent',
        util.inspect(error),
      );
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }
  }

  // gets a account's subscription
  async getSubscriptions(accountId) {

  }

  // creates and charges account for a new subscription
  async createSubscription(accountId: string, source: string, plan: string, coupon?: string) {
    // const customer = await getCustomer(accountId);
    //await attachSource(accountId, source);
    const subscription = await this.stripeService.createSubscription({
      customer: 'customerId',
      coupon: '',
      items: [
        {
          plan: 'Basic'
        }
      ]
    });

    // add the plan to existing subscriptions
    // call database update here

    return subscription;
  }

  async cancelSubscription() {
    const subscription = await this.stripeService.cancelDescription('subscriptionId');
    return subscription;
  }
}
