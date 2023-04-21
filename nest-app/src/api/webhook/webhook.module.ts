import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PaymentService } from 'src/helpers';

@Module({
  imports: [],
  providers: [WebhookService, PaymentService],
  controllers: [WebhookController]
})
export class WebhookModule { }
