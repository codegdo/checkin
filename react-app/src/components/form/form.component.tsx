import React, { PropsWithChildren, useEffect } from 'react';

import { validationHelper, ObjectSchema, schema, util } from '../../helpers';
import { Element } from './form.type';
import { useForm } from './hooks/use-form.hook';
import { FormRender } from './form.render';

interface FormOptions {
  mapKey?: string;
  isMultiSteps?: boolean;
  animation?: 'slide';
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
  stepIndex?: number;
  steps?: (Record<string, string[]> | string)[];
  status?: string | undefined;
  options?: FormOptions;

  isSubmit?: boolean;
  isReload?: boolean;
  isReset?: boolean;
  onClick?: (key: string) => void;
}

export const FormContext = React.createContext<FormContextValue>({ validation: { schema } });

export function Form({ className = 'form', data, status, options, children, onCallback }: FormProps) {
  const {
    form,
    error,
    validation,
    direction,
    stepIndex,
    steps,
    isSubmit,
    isReload,
    isReset,
    onClick: handleClick
  } = useForm({ data, options, onCallback });

  const contextValue: FormContextValue = {
    data,
    status,
    options,
    form,
    error,
    validation,
    steps,
    stepIndex,
    isSubmit,
    isReload,
    isReset,
    onClick: handleClick
  };

  const classNames = util.classNames(className, {
    'form_steps': options?.isMultiSteps && steps.length > 0,
    'is-first': options?.isMultiSteps && stepIndex === 0,
    'is-last': options?.isMultiSteps && stepIndex === steps?.length - 1,
    'on-previous': options?.isMultiSteps && direction === 'previous',
    'on-next': options?.isMultiSteps && direction === 'next',
    'animation-slide': options?.isMultiSteps && options?.animation === 'slide',
  });

  return (
    <form className={classNames} onSubmit={(e) => e.preventDefault()}>
      <FormContext.Provider value={contextValue}>
        {children ? <FormRender>{children}</FormRender> : <FormRender data={data} />}
      </FormContext.Provider>
    </form>
  );
}