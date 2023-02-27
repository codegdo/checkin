import React, { PropsWithChildren } from 'react';
import { FormProvider } from './form.context';
import { Render } from './form.render';
import { BlockData, FieldData } from './form.type';

export interface FormProps {
  title?: string;
  description?: string;
  data?: (BlockData | FieldData)[];
  status?: string | undefined;
  options?: {
    keyOption?: string;
  };
  onCallback?: (key?: string, values?: any) => void;
}

const Form: React.FC<PropsWithChildren<FormProps>> = ({ children, ...props }): JSX.Element => {
  return (
    <FormProvider {...props}>
      {children ? <Render>{children}</Render> : <Render data={props.data} />}
    </FormProvider>
  );
};

export default Form;