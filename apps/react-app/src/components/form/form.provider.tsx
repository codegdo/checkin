import React from 'react';
import { Field } from './types';

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormContextValue {
  data: Field[];
  values: FormValues;
  errors: FormErrors;
  handleClick: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue>({
  data: [],
  values: {},
  errors: {},
  handleClick: () => console.log('click')
});

export const FormProvider = FormContext.Provider;
export default FormContext;
