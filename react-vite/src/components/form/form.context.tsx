import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import { validationHelper, ObjectSchema } from '../../helpers';
import { FormProps } from './form.component';
import { Element } from './form.type';

export interface FormContextProps {
  data?: Element[];
  form?: { [key: string]: any };
  error?: { [key: string]: string };
  validation: { schema: ObjectSchema };
  status: string | undefined;
  options?: { keyOption?: string };

  isSubmit: boolean;
  isReset: boolean;
  onClick: (key: string) => void;
}

const schema = validationHelper.objectSchema();

const initialProps: FormContextProps = {
  data: [],
  form: {},
  error: {},
  validation: { schema },
  status: '',
  options: {},
  isSubmit: false,
  isReset: false,
  onClick: () => console.log('onClick')
}

export const FormContext = React.createContext<FormContextProps>(initialProps);

export function FormProvider({ data, status, options = {}, onCallback, children }: FormProps) {

  const { current: form } = useRef<Record<string, string>>({});
  const { current: error } = useRef<Record<string, string>>({});
  const { current: validation } = useRef({ schema });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      if (Object.keys(error).length === 0) {
        onCallback?.('submit', form);
      }

      console.log('WATCH', form);
      console.log('ERROR', error);
    }

    return () => setIsSubmit(false)
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      console.log('WATCH', form);
      console.log('ERROR', error);
    }

    return () => setIsReset(false);
  }, [isReset]);

  const onClick = useCallback(async (key: string) => {
    switch (key) {
      case 'submit':
        // validation
        const initialErrors = Object.keys(error).length === 0;

        if (initialErrors) {
          const errors = await validationHelper.checkValidation(validation, form);
          for (const [key] of Object.entries(errors)) {
            error[key] = errors[key];
          }
        }

        setIsSubmit(true);
        break;
      case 'reset':
        setIsReset(true);
        break;
      default:
        onCallback?.(key, form);
    }
  }, [onCallback]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormContext.Provider value={{ data, form, error, validation, status, options, isSubmit, isReset, onClick }}>
        {children}
      </FormContext.Provider>
    </form>
  );
}