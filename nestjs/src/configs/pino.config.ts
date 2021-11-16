import { registerAs } from "@nestjs/config";

export const pinoConfig = registerAs('pino', () => {
  return {
    pinoHttp: [
      {
        transport: process.env.NODE_ENV !== 'production' ?
          {
            target: 'pino-pretty',
            options: {
              colorize: true,
              levelFirst: true,
              translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z'
            }
          } : {}
      }
    ]
  }
});
