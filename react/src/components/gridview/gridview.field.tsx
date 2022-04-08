import React, { useContext } from 'react';
import { Input } from '../input';
import { ControlContext } from './gridview.control';

export const Field: React.FC = (): JSX.Element => {

  const context = useContext(ControlContext);

  if (!context) {
    throw new Error('Require Field nested in CONTROLCOTEXT');
  }

  const { handleChange } = context;

  return <><Input onChange={handleChange} /></>
}