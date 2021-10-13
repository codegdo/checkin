import { registerAs } from "@nestjs/config";

export const mailerConfig = registerAs('mailer', () => ({
  transport: {
    host: process.env.MAILER_HOST,
    port: 587,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD
    }
  }
}));
