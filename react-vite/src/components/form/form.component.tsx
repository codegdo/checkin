import React, { PropsWithChildren } from 'react';
import { FormProvider } from './form.context';
import { FormRender } from './form.render';
import { BlockData, FieldData } from './form.type';

export interface FormProps extends PropsWithChildren {
  title?: string;
  description?: string;
  data?: (BlockData | FieldData)[];
  status?: string | undefined;
  options?: {
    keyOption?: string;
  };
  onCallback?: (key?: string, values?: any) => void;
}

const Form: React.FC<FormProps> = ({ children, ...props }): JSX.Element => {
  return (
    <FormProvider {...props}>
      {children ? <FormRender>{children}</FormRender> : <FormRender data={props.data} />}
    </FormProvider>
  );
};

export default Form;