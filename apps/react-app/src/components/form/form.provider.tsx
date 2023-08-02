import React from 'react';
import { Field, FormErrors, FormEvents, FormValues } from './types';

export interface FormContextValue {
  data: Field[];
  values: FormValues;
  errors: FormErrors;
  events: FormEvents;
  status: string | null | undefined;
  handleClick: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue>({
  data: [],
  values: {},
  errors: {},
  events: {},
  status: null,
  handleClick: () => console.log('click')
});

export const FormProvider = FormContext.Provider;
export default FormContext;
