import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { FormContextProps, FormProps } from './form.type';

const initialProps: FormContextProps = {
  data: null,
  form: {},
  error: {},
  schema: {},
  status: '',
  isSubmitting: false,
  onClick: () => console.log('onClick')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

export const FormProvider: React.FC<PropsWithChildren<FormProps>> = ({ data, status, children }) => {

  const { current: form } = useRef({});
  const { current: error } = useRef({});
  const { current: schema } = useRef({});

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log(isSubmitting, form);

    return () => setSubmitting(false);
  }, [isSubmitting]);

  const onClick = (key: string) => {

    switch (key) {
      case 'submit':
        setSubmitting(true);
        break;
      default: return;
    }
  }

  return <form onSubmit={(e) => e.preventDefault()}>
    <FormContext.Provider value={{ data, form, error, schema, status, isSubmitting, onClick }}>
      {children}
    </FormContext.Provider>
  </form>
}