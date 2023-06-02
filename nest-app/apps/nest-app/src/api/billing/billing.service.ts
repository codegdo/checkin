import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as util from 'util';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly url: string;
  private readonly webhookSecret: string;
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.url = configService.get('CLIENT_HOST');
    this.webhookSecret = configService.get('STRIPE_WEBHOOK_SECRET');
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: configService.get('STRIPE_API_VERSION'),
    });
  }

  constructEventFromWebhookSignature(signature: string, payload: Buffer) {
    const webhookSecret = this.webhookSecret;
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }

  async createCustomer(accountId: string, email: string, params?: Stripe.CustomerCreateParams) {
    const customer = await this.stripe.customers.create({
      email,
      metadata: {
        accountId
      },
      ...params
    });
    return customer;
  }

  async createCheckoutSession(items) {
    return this.stripe.checkout.sessions.create({
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

      return await this.stripe.paymentIntents.create(paymentIntentParams);
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
    const subscription = await this.stripe.subscriptions.create({
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
    const subscription = await this.stripe.subscriptions.del('subscriptionId');
    return subscription;
  }

  paymentIntentCreated(data: Stripe.Event.Data.Object) {
    // add your business logic here
    console.log('PAYMENT CREATED', data);
  }

  paymentIntentSucceeded(data: Stripe.Event.Data.Object) {
    // add your business logic here
    console.log('PAYMENT SUCCESS', data);
  }

  paymentIntentFailed(data: Stripe.Event.Data.Object) {
    // add your business logic here
    console.log('PAYMENT FAIL', data);
  }


}
