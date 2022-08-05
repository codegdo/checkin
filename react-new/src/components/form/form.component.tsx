import React, { PropsWithChildren, useRef } from 'react';
import { FormProvider } from './form.context';
import { Render } from './form.render';

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string | undefined;
  onClick?: (key?: string, value?: string) => void;
}

export const Form: React.FC<PropsWithChildren<FormProps>> = ({ data, title, status, children, onClick, ...props }): JSX.Element => {
  const { current: form } = useRef({});
  const { current: error } = useRef({});
  const { current: validation } = useRef({});

  const handleClick = () => {
    onClick && onClick();
  }

  return <form>
    {title && <header>{title}</header>}
    <main>
      <FormProvider data={data} form={form} error={error} validation={validation} status={status} onClick={handleClick}>
        {
          children ? <Render>{children}</Render> : <Render />
        }
      </FormProvider>
    </main>
  </form>
}