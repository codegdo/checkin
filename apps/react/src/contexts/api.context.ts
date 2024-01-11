import { createContext } from "react";

export type ContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => any;
}

export const ContextApi = createContext<ContextValue | null>(null);
export const ProviderApi = ContextApi.Provider;