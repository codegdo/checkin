import React, { PropsWithChildren, useRef } from 'react';
import { FormProvider } from './form.context';
import { Render } from './form.render';

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string | undefined;
  onCallback?: (key?: string, value?: string) => void;
}

export const Form: React.FC<PropsWithChildren<FormProps>> = ({ data, title, status, children, onCallback, ...props }): JSX.Element => {
  const { current: form } = useRef({});
  const { current: error } = useRef({});
  const { current: validation } = useRef({});

  const handleCallback = () => {
    onCallback && onCallback();
  }

  return <form>
    {title && <header>{title}</header>}
    <main>
      <FormProvider data={data} form={form} error={error} validation={validation} status={status} onCallback={handleCallback}>
        {
          children ? <Render>{children}</Render> : <Render />
        }
      </FormProvider>
    </main>
  </form>
}