import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: configService.get('STRIPE_API_VERSION'),
    });
  }

  async constructEvent(payload: string | Buffer, header: string | Buffer | string[], secret: string, tolerance?: number, cryptoProvider?: Stripe.CryptoProvider) {
    return this.stripe.webhooks.constructEvent(payload, header, secret, tolerance, cryptoProvider);
  }

  async createCheckoutSession(params: Stripe.Checkout.SessionCreateParams, options?: Stripe.RequestOptions) {
    return this.stripe.checkout.sessions.create(params, options);
  }

  async createPaymentIntent(paymentIntentParams: Stripe.PaymentIntentCreateParams, options?: Stripe.RequestOptions) {
    return this.stripe.paymentIntents.create(paymentIntentParams, options);
  }

  async createSubscription(params: Stripe.SubscriptionCreateParams, options?: Stripe.RequestOptions) {
    return this.stripe.subscriptions.create(params, options);
  }

  async cancelSubscription(id: string, params?: Stripe.SubscriptionDeleteParams, options?: Stripe.RequestOptions) {
    return this.stripe.subscriptions.del(id, params, options);
  }
}
