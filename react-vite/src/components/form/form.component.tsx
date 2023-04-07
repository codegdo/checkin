import React, { PropsWithChildren, useEffect } from 'react';

import { validationHelper, ObjectSchema } from '../../helpers';
import { Element } from './form.type';
import { schema, useForm } from './hooks/use-form.hook';
import { FormRender } from './form.render';

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
  onCallback?: (data: string | any) => void;
}

export interface FormContextValue {
  data?: Element[];
  form?: { [key: string]: any };
  error?: { [key: string]: string };
  validation: { schema: ObjectSchema };
  status?: string | undefined;
  options?: { keyOption?: string };

  isSubmit?: boolean;
  isReset?: boolean;
  onClick?: (key: string) => void;
}

export const FormContext = React.createContext<FormContextValue>({ validation: { schema } });

export function Form({ data, status, options, children, onCallback }: FormProps) {

  const {
    form, error, validation, isSubmit, isReset, onClick: handleClick
  } = useForm({ onCallback });

  const contextValue: FormContextValue = { data, status, options, form, error, validation, isSubmit, isReset, onClick: handleClick };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormContext.Provider value={contextValue}>
        {children ? <FormRender>{children}</FormRender> : <FormRender data={data} />}
      </FormContext.Provider>
    </form>
  );
}