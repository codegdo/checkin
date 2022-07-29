import React, { PropsWithChildren } from 'react';

export interface FormContextProps {
  data?: any;
  form: Record<string, string | undefined>;
  error: Record<string, string | undefined>;
  validation: Record<string, string | undefined>;
  status: string;
  onClick: (key?: string, value?: string) => void;
};

type FormProviderProps = FormContextProps;

const initialProps: FormContextProps = {
  data: null,
  form: {},
  error: {},
  validation: {},
  status: '',
  onClick: () => console.log('onClick')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

export const FormProvider: React.FC<PropsWithChildren<FormProviderProps>> = ({ children, ...props }) => {
  return <FormContext.Provider value={{ ...props }}>
    {children}
  </FormContext.Provider>
}