import { registerAs } from "@nestjs/config";

export const twilioConfig = registerAs('twilio', () => {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  }
});
