import React, { PropsWithChildren, useRef } from 'react';
import { FormContextProps, FormProps } from './form.type';

const initialProps: FormContextProps = {
  data: null,
  form: {},
  error: {},
  validation: {},
  status: '',
  onClick: () => console.log('onClick')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

export const FormProvider: React.FC<PropsWithChildren<FormProps>> = ({ data, status, children }) => {

  const { current: form } = useRef({});
  const { current: error } = useRef({});
  const { current: validation } = useRef({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(e.target);
  }

  const onClick = (key, value) => {
    alert(key);
  }

  return <form onSubmit={onSubmit}>
    <FormContext.Provider value={{ data, form, error, validation, status, onClick }}>
      {children}
    </FormContext.Provider>
  </form>
}