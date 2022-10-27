import React, { FC } from 'react';
import { ControlRange } from './control.range';

export const Control: FC<any> = (props): JSX.Element | null => {
  switch (props.type) {
    case 'range': return <ControlRange {...props} />;

    default: return null;
  }
}