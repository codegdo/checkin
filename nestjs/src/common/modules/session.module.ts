import * as session from 'express-session';
import { createModule } from 'create-nestjs-middleware-module';
import { Session } from 'express-session';

interface ConfigSession {
  options: session.SessionOptions;
}

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const SessionModule = createModule<ConfigSession>((config) => {
  const { options } = config;
  return session(options);
});
