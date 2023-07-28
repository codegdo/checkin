import React from 'react';
import { Field } from './types';

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormContextValue {
  values: FormValues;
  errors: FormErrors;
  data: Field[];
}

const FormContext = React.createContext<FormContextValue>({
  values: {},
  errors: {},
  data: []
});

export const FormProvider = FormContext.Provider;
export default FormContext;
