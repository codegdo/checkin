import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/helpers';

@Injectable()
export class AccountService {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }

  addSubscription() {
    this.paymentService.addCreditCard();

    return {};
  }
}
