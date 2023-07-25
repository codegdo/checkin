import React, { Dispatch } from 'react';
import { FormAction } from './reducers/form.reducer';

interface FormState {
  isSubmit: boolean;
}

interface FormData {
  values: Record<string, string>;
}

export interface FormContextValue {
  state: FormState;
  dispatch: Dispatch<FormAction>;
  form: FormData;
}

const FormContext = React.createContext({});

export const FormProvider = FormContext.Provider;
export default FormContext;
