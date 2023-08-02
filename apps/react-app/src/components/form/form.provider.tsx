import React from 'react';
import { Field, FormErrors, FormEvents, FormValues } from './types';
import { ObjectSchema, objSchema } from './helpers';

export interface FormContextValue {
  data: Field[];
  values: FormValues;
  errors: FormErrors;
  events: FormEvents;
  schema: ObjectSchema;
  validation: {
    schema: ObjectSchema;
  };
  status: string | null | undefined;
  handleClick: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue>({
  data: [],
  values: {},
  errors: {},
  events: {},
  schema: objSchema,
  validation: {
    schema: objSchema,
  },
  status: null,
  handleClick: () => console.log('click')
});

export const FormProvider = FormContext.Provider;
export default FormContext;
