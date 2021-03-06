import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputRadio: React.FC = (): JSX.Element => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('Require INPUT nested in INPUTCONTEXT');
  }

  const { input, value, handleChange } = context;
  const { data = [], name } = input;

  return (
    <>
      {
        data && data.map(({ key, value: text }: any) => {
          return (
            <label key={key}>
              <input type="radio" name={name} value={key} checked={key == value} onChange={handleChange} />
              {text && <span>{text}</span>}
            </label>
          )
        })
      }
    </>
  )
}