import React, { PropsWithChildren, useRef } from 'react';
import { FormProvider } from './form.context';
import { Render } from './form.render';
import { FormProps } from './form.type';


export const Form: React.FC<PropsWithChildren<FormProps>> = ({ children, ...props }): JSX.Element => {


  return <FormProvider {...props}>


    <main>
      {
        children ? <Render>{children}</Render> : <Render />
      }
    </main>


  </FormProvider>
}