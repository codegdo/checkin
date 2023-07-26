import React from 'react';
import { FormErrors, FormValues } from './hooks/use-form.hook';
import { FormFieldType } from './types';

export interface FormContextValue {
  values: FormValues;
  errors: FormErrors;
  data: FormFieldType[];
}

const FormContext = React.createContext<FormContextValue>({
  values: {},
  errors: {},
  data: []
});

export const FormProvider = FormContext.Provider;
export default FormContext;
