import * as session from 'express-session';
import { createModule } from 'create-nestjs-middleware-module';

interface ConfigSession {
  options: session.SessionOptions;
}

export const SessionModule = createModule<ConfigSession>((config) => {
  const { options } = config;
  return session(options);
});
