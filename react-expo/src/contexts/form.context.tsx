import React, { ReactNode, useMemo } from 'react';

export type FormContextProps = {
  form: Record<string, string | undefined>;
  error: Record<string, string | undefined>;
  callback: (key?: string, value?: string) => void;
};

type FormProviderProps = FormContextProps;

const initialProps: FormContextProps = {
  form: {},
  error: {},
  callback: () => console.log('no callback')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

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