import React, { FC } from 'react';
import { ControlPadding } from './control.padding';

export const Control: FC<any> = (props): JSX.Element | null => {
  switch (props.type) {
    case 'padding': return <ControlPadding {...props} />;

    default: return null;
  }
}