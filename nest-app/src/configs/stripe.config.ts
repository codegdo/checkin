import { registerAs } from '@nestjs/config';

export const stripeConfig = registerAs('stripe', () => {
  return {
    apiKey: process.env.STRIPE_SECRET_KEY,
    apiVersion: process.env.STRIPE_API_VERSION
  };
});
