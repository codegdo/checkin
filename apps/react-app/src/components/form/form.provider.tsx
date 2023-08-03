import React from 'react';
import { Field, FormErrors, FormEvents, FormValues } from './types';
import { ObjectSchemaExtend, objSchema } from './helpers';

export interface FormContextValue {
  data: Field[];
  values: FormValues;
  errors: FormErrors;
  events: FormEvents;
  schema: ObjectSchemaExtend;
  form: {
    schema: ObjectSchemaExtend;
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
  form: {
    schema: objSchema,
  },
  status: null,
  handleClick: () => console.log('click')
});

export const FormProvider = FormContext.Provider;
export default FormContext;
