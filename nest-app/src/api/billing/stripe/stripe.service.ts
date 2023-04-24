import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as util from 'util';
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

  async constructEvent(signature: string, payload: Buffer) {
    return this.stripe.webhooks.constructEvent(payload, signature, this.configService.get('STRIPE_WEBHOOK_SECRET'));
  }

  async createPaymentIntent(paymentIntentParams: Stripe.PaymentIntentCreateParams, options?: Stripe.RequestOptions) {
    return this.stripe.paymentIntents.create(paymentIntentParams, options);
  }

  async createSubscription(params: Stripe.SubscriptionCreateParams, options?: Stripe.RequestOptions) {
    return this.stripe.subscriptions.create(params, options);
  }

  async cancelDescription(id: string, params?: Stripe.SubscriptionDeleteParams, options?: Stripe.RequestOptions) {
    return this.stripe.subscriptions.del(id, params, options);
  }
}
