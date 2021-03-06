import { registerAs } from '@nestjs/config';
import { google } from 'googleapis';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
//import { join } from 'path';

export const mailerConfig = registerAs('mailer', () => async () => {
  try {
    // const OAuth2Client = new google.auth.OAuth2(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.CLIENT_REDIRECT_URI,
    // );

    // OAuth2Client.setCredentials({
    //   refresh_token: process.env.CLIENT_REFRESH_TOKEN,
    // });

    //const accessToken = await OAuth2Client.getAccessToken();

    return {
      transport: {
        host: process.env.MAILER_HOST,
        port: 587,
        auth: {
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
      },

      // transport: {
      //   host: 'smtp.gmail.com',
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     type: 'OAuth2',
      //     user: process.env.CLIENT_EMAIL,
      //     clientId: process.env.CLIENT_ID,
      //     clientSecret: process.env.CLIENT_SECRET,
      //     refreshToken: process.env.CLIENT_REFRESH_TOKEN,
      //     accessToken: accessToken,
      //   },
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // },
      // defaults: {
      //   from: '"No Reply" <checkin.noreply@gmail.com>',
      // },

      // template: {
      //   dir: join(__dirname, 'templates'),
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // }
    };
  } catch (err) {
    console.log(err);
  }
});
