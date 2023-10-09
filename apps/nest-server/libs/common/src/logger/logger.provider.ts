import { Provider } from "@nestjs/common";
import * as winston from 'winston';
import { WinstonTransport } from "./winston-transport";

export const loggerProvider: Provider = {
  provide: 'Logger',
  useFactory: (winstonTransport: WinstonTransport) => {
    return winston.createLogger({
      // Configure your logger here, using winstonTransport
      transports: [winstonTransport],
      // Other logger configuration...
    });
  },
  inject: [WinstonTransport],
};