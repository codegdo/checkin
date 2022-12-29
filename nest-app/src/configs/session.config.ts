import { registerAs } from '@nestjs/config';

export const sessionConfig = registerAs('session', () => {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: parseInt(process.env.SESSION_MAX_AGE ?? '3600000', 10), // 60000
    },
  };
});
