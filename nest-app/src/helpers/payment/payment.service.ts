import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

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
}


//https://wanago.io/2021/06/21/api-nestjs-stripe-save-credit-cards/