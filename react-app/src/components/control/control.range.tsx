import React, { FC } from 'react';
import { useWrapperContext } from '../../hooks';

import { getSetStringKeyObject } from '../../utils';
import { Input } from '../input/input.component';
import { ControlContext } from './control.context';
import { ControlContextProps } from './control.type';

export const ControlRange: FC<any> = ({ label, name }): JSX.Element => {
  const ctx = useWrapperContext(ControlContext as React.Context<ControlContextProps>);

  const { values, onChange } = ctx;
  const { value } = getSetStringKeyObject(values, name);
  let defaultValue;

  console.log('CONTROL RANGE', values, name, ctx);

  switch (name) {
    case 'fontSize':

      break;
    default:
      defaultValue = null;
  }


  return <div>
    <label>{label}</label>
    <Input type='range' name={name} value={value} defaultValue='16' onChange={onChange} />
  </div>
}