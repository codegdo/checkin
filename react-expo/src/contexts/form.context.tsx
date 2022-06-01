import React, { ReactNode, useMemo } from 'react';

export type FormContextProps = {
  values: any
} | undefined;

type FormProviderProps = FormContextProps;

export const FormContext = React.createContext<FormContextProps>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children, ...props }) => {

  // const value = useMemo(() => {
  //   return {
  //     values
  //   }
  // }, []);

  return <FormContext.Provider value={{ ...props }}>
    {children}
  </FormContext.Provider>
}