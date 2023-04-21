import { Controller, Post, RawBodyRequest, Req, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('stripe')
  incomingStripeEvent(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>
  ) {
    this.webhookService.handleIncomingStripeEvent(signature, req.rawBody);
  }
}

//https://wanago.io/2021/07/05/api-nestjs-stripe-events-webhooks/
