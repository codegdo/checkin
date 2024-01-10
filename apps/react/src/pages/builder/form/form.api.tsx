import {createContext, PropsWithChildren } from "react";
import {useGetFormById} from './api';

export type ContextValue = {
  useGetFormById: typeof useGetFormById
}

export const FormContextApi = createContext<ContextValue | null>(null);
export const FormProviderApi = FormContextApi.Provider;

export const FormApi: React.FC<PropsWithChildren> = ({ children }) => (
  <FormProviderApi value={{useGetFormById}}>
    {children}
  </FormProviderApi>
);