import * as expressWinston from 'express-winston';
import logger from '../logger/winston.logger';

export const expressWinstonMiddleware = expressWinston.logger({
  winstonInstance: logger,
  meta: false, // Do not log metadata like headers, query params, etc.
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  colorize: true,
});
