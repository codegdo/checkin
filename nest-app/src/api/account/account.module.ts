import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PaymentService } from 'src/helpers/payment/payment.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  providers: [AccountService, PaymentService],
  controllers: [AccountController]
})
export class AccountModule { }
