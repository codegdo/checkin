import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import * as util from 'util';

import { StripeService } from './stripe/stripe.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BillingService {
  private url: string;

  constructor(
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService
  ) {
    this.url = configService.get('CLIENT_HOST');
  }

  async constructEvent(payload: Buffer, signature: string,) {
    return this.stripeService.constructEvent(payload, signature, this.configService.get('STRIPE_WEBHOOK_SECRET'));
  }

  async createCheckoutSession(items) {
    return this.stripeService.createCheckoutSession({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'subscription',
      success_url: `${this.url}/success?checkout_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.url}/failed`
    });

    /*
      await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [{price: planId, quantity: 1}],
          subscription_data: { 
            trial_period_days: 15
          },
          metadata: {'planId': planId,'product': product},
          success_url: `${domainURL}/index.html?product=${product}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${domainURL}/product=${product}&index.html?session_id=cancelled` ,
          mode: 'subscription',
          ...(customerEmail ? { customer_email: customerEmail } : { customer })
      });
    */
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
        metadata: { orderId },
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
    const subscription = await this.stripeService.cancelSubscription('subscriptionId');
    return subscription;
  }
}
