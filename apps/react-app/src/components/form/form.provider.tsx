import React from 'react';
import { Field, FormErrors, FormEvents, FormValues } from './types';

export interface FormContextValue {
  data: Field[];
  values: FormValues;
  errors: FormErrors;
  events: FormEvents;
  handleClick: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue>({
  data: [],
  values: {},
  errors: {},
  events: {},
  handleClick: () => console.log('click')
});

export const FormProvider = FormContext.Provider;
export default FormContext;
