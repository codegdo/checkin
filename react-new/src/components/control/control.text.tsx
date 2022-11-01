import React, { FC, useContext } from 'react';

import { getSetStringKeyObject } from '../../utils';
import { Input } from '../input/input.component';
import { ControlContext } from './control.context';
import { ControlContextProps } from './control.type';

export const ControlText: FC<any> = ({ label, name }): JSX.Element => {
  const ctx = useContext((ControlContext as Object) as React.Context<ControlContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { values, onChange } = ctx;
  const { value } = getSetStringKeyObject(values, name) || '';

  return <div>
    <label>{label}</label>
    <Input type='text' name={name} value={value} onChange={onChange} />
  </div>
}