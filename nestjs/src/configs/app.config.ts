import { registerAs } from "@nestjs/config";

export const appConfig = registerAs('app', () => ({
  host: process.env.APP_HOST,
  mailerUrl: process.env.MAILER_URL
}));
