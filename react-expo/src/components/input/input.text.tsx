import React, { useContext } from 'react';
import { TextInput } from 'react-native';

import { useStyle } from '../../hooks';
import { InputProps, InputTextData } from './input.type';

export const InputText: React.FC<InputProps> = (props) => {
  const { name, type = 'text', value = '', placeholder = '', className = 'input', onChange } = props;
  const [inputStyle] = useStyle(className);

  const handleChange = (input: InputTextData) => {
    onChange && onChange(input);
  }

  return <TextInput
    secureTextEntry={type == 'password' ? true : false}
    style={inputStyle}
    value={value}
    placeholder={placeholder}
    autoCapitalize='none'
    onChangeText={text => handleChange({ name, type, text })}
  />
}