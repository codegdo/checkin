import { registerAs } from "@nestjs/config";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailerConfig = registerAs('mailer', () => ({
  transport: {
    host: process.env.MAILER_HOST,
    port: 587,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD
    }
  },
  defaults: {
    from: '"No Reply" <noreply@checkin.com>'
  },
  /* template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  } */
}));
