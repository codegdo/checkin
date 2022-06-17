import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputRender as render } from './input.render';
import { useStyle } from '../../hooks';
import { InputProps, InputData } from './input.type';

export const Input: React.FC<InputProps> = ({ title, className = 'label : input', onChange, ...props }) => {
  const [labelStyle, classNames] = useStyle(className);

  const [value, setValue] = useState(props.value);

  const callback = useCallback((input: InputData) => {
    console.log('INPUT CHANGE', input);
    setValue(input.text);
    onChange && onChange(input);
  }, []);

  return <>
    {
      title && <Text style={labelStyle}>{title}</Text>
    }
    {
      render({ ...props, value, onChange: callback, className: classNames })
    }
  </>
}
