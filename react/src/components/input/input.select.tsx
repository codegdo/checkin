import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputSelect: React.FC = (): JSX.Element => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('Require INPUT nested in INPUTCONTEXT');
  }

  const { input, value: _value, handleChange } = context;
  const { data = [] } = input;

  return (
    <span>
      <select value={_value} onChange={handleChange}>
        <option value="">--</option>
        {
          data && data.map(({ key, value }: any, i: number) => {
            return <option key={i} value={key}>{value}</option>
          })
        }
      </select>
    </span>
  )
}