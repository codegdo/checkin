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
  isSubmitting: false,
  onClick: () => console.log('onClick')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

export const FormProvider: React.FC<PropsWithChildren<FormProps>> = ({ data, status, children }) => {

  const { current: form } = useRef<{ [key: string]: string }>({});
  const { current: errors } = useRef<{ [key: string]: string }>({});
  const { current: validation } = useRef({ schema: formHelper.formSchema() });
  const { formValidation } = useFormValidation(null, form, errors, validation);

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {

    if (isSubmitting) {
      const isValidated = formValidation();

      if (isValidated) {
        console.log('SUBMIT', form);
      }

      console.log('ERROR', errors);
    }

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
    <FormContext.Provider value={{ data, form, errors, validation, status, isSubmitting, onClick }}>
      {children}
    </FormContext.Provider>
  </form>
}