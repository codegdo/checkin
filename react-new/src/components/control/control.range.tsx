import React, { FC } from 'react';
import { Input } from '../input/input.component';

export const ControlRange: FC<any> = ({ label }): JSX.Element => {
  return <div>
    <label>{label}</label>
    <Input type='range' name='range' />
  </div>
}