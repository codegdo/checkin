import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import { validationHelper, ObjectSchema } from '../../helpers';
import { Element } from './form.type';

interface FormOptions {
  keyOption?: string;
}

interface FormProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
  data?: Element[];

  status?: string | undefined;
  options?: FormOptions;
  onCallback?: (key?: string, values?: any) => void;
}

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
      setIsSubmit(false);
      console.log('WATCH', form);
      console.log('ERROR', error);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      console.log('WATCH', form);
      console.log('ERROR', error);
      setIsReset(false);
    }
  }, [isReset]);

  const handleClick = useCallback(async (key: string) => {
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
      <FormContext.Provider value={{ data, form, error, validation, status, options, isSubmit, isReset, onClick: handleClick }}>
        {children}
      </FormContext.Provider>
    </form>
  );
}