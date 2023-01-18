import React, { FC } from 'react';
import { useWrapperContext } from '../../hooks';

import { getSetStringKeyObject } from '../../utils';
import { Input } from '../input/input.component';
import { ControlContext } from './control.context';
import { ControlContextProps } from './control.type';

export const ControlText: FC<any> = ({ label, name }): JSX.Element => {
  const ctx = useWrapperContext((ControlContext) as React.Context<ControlContextProps>);

  const { values, onChange } = ctx;
  const { value } = getSetStringKeyObject(values, name);

  console.log('CONTROL TEXT', values, name, ctx);

  return <div>
    <label>{label}</label>
    <Input type='text' name={name} value={value} onChange={onChange} />
  </div>
}