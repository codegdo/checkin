import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PaymentService } from 'src/helpers';
import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [BillingModule],
  providers: [WebhookService, PaymentService],
  controllers: [WebhookController]
})
export class WebhookModule { }
