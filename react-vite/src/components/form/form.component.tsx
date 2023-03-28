import React, { PropsWithChildren } from 'react';
import { FormProvider } from './form.context';
import { FormRender } from './form.render';
import { Element } from './form.type';

interface FormOptions {
  keyOption?: string;
}

export interface FormProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
  data?: Element[];

  status?: string | undefined;
  options?: FormOptions;
  onCallback?: (key?: string, values?: any) => void;
}

export function Form({ children, ...props }: FormProps) {
  return (
    <FormProvider {...props}>
      {children ? <FormRender>{children}</FormRender> : <FormRender data={props.data} />}
    </FormProvider>
  );
};