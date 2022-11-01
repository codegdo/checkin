import React, { FC, PropsWithChildren } from 'react';
import { ControlProvider } from './control.context';
import { ControlRender } from './control.render';
import { ControlProps } from './control.type';

export const Control: FC<PropsWithChildren<ControlProps>> = ({ children, ...props }): JSX.Element | null => {

  return <ControlProvider {...props}>
    {
      children ? children : <ControlRender data={props.data} />
    }
  </ControlProvider>
}