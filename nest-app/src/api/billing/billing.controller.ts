import { Body, Controller, Post } from '@nestjs/common';
import { AuthType } from 'src/constants';
import { Auth } from 'src/decorators';
import { BillingService } from './billing.service';

@Auth(AuthType.None)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) { }

  @Post('checkouts')
  checkouts(@Body() body: any) {
    console.log(body);
    const { data } = body;
    return this.billingService.createCheckoutSession(data);
  }

  @Post('payments')
  payments(@Body() body: any) {
    console.log(body);
    const { data } = body;
    return this.billingService.createPaymentIntent(data.orderId, data.totalAmount);
  }

  @Post('subscriptions')
  subscriptions(@Body() body: any) {
    console.log(body);
    const { data } = body;
    return this.billingService.createCheckoutSession(data);
  }

}
