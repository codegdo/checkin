import React, { PropsWithChildren } from 'react';
import { FormProvider } from './form.context';
import { Render } from './form.render';
import { FormProps } from './form.type';


export const Form: React.FC<PropsWithChildren<FormProps>> = ({ children, ...props }): JSX.Element => {
  return <FormProvider {...props}>
    {
      children ? <Render>{children}</Render> : <Render />
    }
  </FormProvider>
}