import { createContext } from "react";

export type ContextValue = {
  [key: string]: () => void;
}

export const ContextApi = createContext<ContextValue | null>(null);
export const ProviderApi = ContextApi.Provider;