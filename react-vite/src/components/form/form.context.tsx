import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import { FormContextProps, FormProps } from './form.type';
import { validationHelper } from '../../helpers';
import { useFormValidation } from '../../hooks';

const validationSchema = {
  schema: validationHelper.objectSchema()
}

const initialProps: FormContextProps = {
  data: null,
  form: {},
  errors: {},
  validation: { ...validationSchema },
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
  const { current: validation } = useRef({ ...validationSchema });
  const { formValidation } = useFormValidation({ form, validation, callbackError });

  const [isSubmit, setSubmit] = useState(false);
  const [isReset, setReset] = useState(false);

  useEffect(() => {

    if (isSubmit) {
      if (Object.keys(errors).length === 0) {
        console.log('SUBMIT', form);
        onCallback && onCallback('submit', form);
      }

      console.log('WATCH', form);
      console.log('ERROR', errors);
    }

    return () => setSubmit(false)
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

  const onClick = useCallback(async (key: string) => {
    switch (key) {
      case 'submit':
        // validation
        const initialErrors = Object.keys(errors).length === 0;

        if (initialErrors) {
          await formValidation();
        }

        setSubmit(true);

        break;
      case 'reset':
        setReset(true);
        break;
      default:
        onCallback && onCallback(key, form);
    }
  }, []);

  return <form onSubmit={(e) => e.preventDefault()}>
    <FormContext.Provider value={{ data, form, errors, validation, status, options, isSubmit, isReset, onClick }}>
      {children}
    </FormContext.Provider>
  </form>
}