import React, { PropsWithChildren, useEffect } from 'react';

import { validationHelper, ObjectSchema, util } from '../../helpers';
import { Element } from './form.type';
import { schema, useForm } from './hooks/use-form.hook';
import { FormRender } from './form.render';

interface FormOptions {
  mapKey?: string;
  isMultiSteps?: boolean;
}

interface FormProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
  data?: Element[];

  status?: string | undefined;
  steps?: string[];
  options?: FormOptions;
  onCallback?: (data: string | any) => void;
}

export interface FormContextValue {
  data?: Element[];
  form?: { [key: string]: any };
  error?: { [key: string]: string };
  validation: { schema: ObjectSchema };
  steps?: string[];
  currentStepIndex?: number;
  status?: string | undefined;
  options?: FormOptions;

  isSubmit?: boolean;
  isReset?: boolean;
  onClick?: (key: string) => void;
}

export const FormContext = React.createContext<FormContextValue>({ validation: { schema } });

export function Form({ className = 'form', data, status, options, steps = [], children, onCallback }: FormProps) {

  const {
    form,
    error,
    validation,
    currentStepIndex,
    isSubmit,
    isReset,
    onClick: handleClick
  } = useForm({ steps, onCallback });

  const contextValue: FormContextValue = {
    data,
    status,
    options,
    form,
    error,
    validation,
    steps,
    currentStepIndex,
    isSubmit,
    isReset,
    onClick: handleClick
  };

  const classNames = util.classNames(className, {
    'form-steps': options?.isMultiSteps && steps.length > 0,
    'is-first': options?.isMultiSteps && currentStepIndex === 0,
    'is-last': options?.isMultiSteps && currentStepIndex === steps?.length - 1
  });

  return (
    <form className={classNames} onSubmit={(e) => e.preventDefault()}>
      <FormContext.Provider value={contextValue}>
        {children ? <FormRender>{children}</FormRender> : <FormRender data={data} />}
      </FormContext.Provider>
    </form>
  );
}