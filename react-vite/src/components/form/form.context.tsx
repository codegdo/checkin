import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { FormContextProps, FormProps } from './form.type';
import { formHelper } from '../../helpers';
import { useFormValidation } from '../../hooks';

const initialProps: FormContextProps = {
  data: null,
  form: {},
  errors: {},
  validation: {},
  status: '',
  options: {},
  isSubmit: false,
  isReset: false,
  onClick: () => console.log('onClick')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

export const FormProvider: React.FC<PropsWithChildren<FormProps>> = ({ data, status, options = {}, onCallback, children }) => {

  const { current: form } = useRef<{ [key: string]: string }>({});
  const { current: errors } = useRef<{ [key: string]: string }>({});
  const { current: validation } = useRef({ schema: formHelper.formSchema() });
  const { formValidation } = useFormValidation({ form, validation, callbackError });

  const [isSubmit, setSubmit] = useState(false);
  const [isReset, setReset] = useState(false);

  useEffect(() => {

    if (isSubmit) {
      const hasErrors = Object.keys(errors).length === 0;
      const isValidated = formValidation(hasErrors);

      if (isValidated) {
        console.log('SUBMIT', form);
        onCallback && onCallback('submit', form);
      }
      console.log('WATCH', form);
      console.log('ERROR', errors);
    }

    return () => setSubmit(false);
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      console.log('WATCH', form);
      console.log('ERROR', errors);
    }

    return () => setReset(false);
  }, [isReset]);

  function callbackError(key: string, message: string) {
    errors[key] = message;
  }

  const onClick = (key: string) => {

    switch (key) {
      case 'submit':
        setSubmit(true);
        break;
      case 'reset':
        setReset(true);
        break;
      default:
        onCallback && onCallback(key, form);
    }
  }

  return <form onSubmit={(e) => e.preventDefault()}>
    <FormContext.Provider value={{ data, form, errors, validation, status, options, isSubmit, isReset, onClick }}>
      {children}
    </FormContext.Provider>
  </form>
}