import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService
  ) {
    // this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
    //   apiVersion: '2022-11-15',
    // });
  }

  addCreditCard() {
    console.log(this.configService.get('STRIPE_SECRET_KEY'));
  }
}


//https://wanago.io/2021/06/21/api-nestjs-stripe-save-credit-cards/