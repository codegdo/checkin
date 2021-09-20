import React, { useState } from 'react';
import { InputRender as render } from './input.render';
import { InputContextProps, InputProps } from './input.type';


export const InputContext = React.createContext<InputContextProps | undefined>(undefined);

export const Input: React.FC<InputProps> = ({ input, onChange, ...props }): JSX.Element => {

  const data = input || props;
  const { type, value: initialValue, defaultValue = '' } = data;

  const [value, setValue] = useState(initialValue || defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  return (
    <div>
      <InputContext.Provider value={{ data, value, handleChange }}>
        {
          render({ type })
        }
      </InputContext.Provider>
    </div>
  )
}


