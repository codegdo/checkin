import * as session from 'express-session';
import { createModule } from 'create-nestjs-middleware-module';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
interface ConfigSession {
  options: session.SessionOptions;
}

export const SessionModule = createModule<ConfigSession>((config) => {
  const { options } = config;
  return session(options);
});
