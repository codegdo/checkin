import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { FormContextProps, FormProps } from './form.type';
import { formHelper } from '../../helpers';

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

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {

    if (isSubmitting) {
      console.log(errors);
    }

    return () => setSubmitting(false);
  }, [isSubmitting]);

  const onClick = (key: string) => {

    switch (key) {
      case 'submit':

        if (Object.keys(errors).length === 0) {
          const { error } = validation.schema.validate(form, { abortEarly: false });

          if (error) {
            error.details.forEach(({ message, context }) => {
              const key = context?.key;

              if (key) {
                errors[key] = message;
              }
            });
          }
        }

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