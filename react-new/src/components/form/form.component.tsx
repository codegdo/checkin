import React, { PropsWithChildren } from 'react';
import { Render } from './form.render';

export interface FormProps {
  title?: string;
  description?: string;
  data?: any;
  status?: string;
  onClick?: (key?: string, value?: string) => void;
}

export const Form: React.FC<PropsWithChildren<FormProps>> = ({ children, title, ...props }): JSX.Element => {
  return <form>
    {title && <header>{title}</header>}
    <main>
      {
        children ? <Render>{children}</Render> : <Render data={props.data?.data} />
      }
    </main>
  </form>
}