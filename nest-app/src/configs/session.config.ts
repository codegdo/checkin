import { registerAs } from '@nestjs/config';

export const sessionConfig = registerAs('session', () => {
  return {
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, // 60000
    },
  };
});
