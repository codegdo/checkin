import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: configService.get('STRIPE_API_VERSION'),
    });
  }

  async constructEvent(signature: string, payload: Buffer) {
    return this.stripe.webhooks.constructEvent(payload, signature, this.configService.get('STRIPE_WEBHOOK_SECRET'));
  }

  addCreditCard() {
    console.log(this.configService.get('STRIPE_SECRET_KEY'));
  }

  async createPaymentSession() {

  }

  async createPaymentIntent(amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      // receipt_email: ''
    });

    return paymentIntent;
  }
  // customers and setup intents
  // save a card on the customer with setup intent
  // endpoint /wallet
  async createSetupIntent(accountId: string) {
    // get customer from stripe

    return this.stripe.setupIntents.create({
      customer:'customerId'
    })
  }

  async listPaymentMethods(accountId:string) {
    // get customer
    return this.stripe.paymentMethods.list({
      customer: 'customer.id',
      type: 'card'
    })
  }

  async createNewCustomer() {
    const customer = await this.stripe.customers.create({
      email: '',
      metadata: {
        accountId: ''
      }
    });

    // call update database

    return customer;
  }

  // endpoint billing/subscriptions
  async createSubscription(accountId: string, plan: string, payment_method:string) {
    // get customer

    // attach the payment method to the customer
    await this.stripe.paymentMethods.attach(payment_method, { 
      customer: 'customer.id'
    });

    // set it as the default payment method
    await this.stripe.customers.update('customer.id', {
      invoice_settings: {
        default_payment_method: payment_method
      }
    });

    // create subscription
    const subscription = await this.stripe.subscriptions.create({
      customer: 'customer.id',
      items: [{plan}],
      expand: ['latest_invoice.payment_intent']
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const payment_intent = invoice.payment_intent as Stripe.PaymentIntent;

    if(payment_intent.status === 'succeeded') {
      // update database
      // {stripeCustomerId, activePlans}
    }

    return subscription;
  }

  // unsubscribe or cancel
  async cancelSubscription(accountId: string, subscriptionId:string) {
    // find customer from stripe

    // check
    // if(customer.metadata.accountId !== accountId) throw error

    //const subscription = await this.stripe.subscriptions.del(subscriptionId);

    const subscription = await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });

    if(subscription.status === 'canceled') {
      // update database
    }

    return subscription;

  }

  async listSubscriptions(accoundId: string) {
    // find customer from stripe

    const subscriptions = await this.stripe.subscriptions.list({
      customer: 'customer.id'
    });

    return subscriptions;
  }

  
}


//https://wanago.io/2021/06/21/api-nestjs-stripe-save-credit-cards/