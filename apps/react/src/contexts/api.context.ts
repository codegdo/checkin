import { createContext } from "react";

export type ContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => any;
}

export const ApiContext = createContext<ContextValue | null>(null);
