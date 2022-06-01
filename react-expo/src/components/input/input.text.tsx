import React, { useContext } from 'react';
import { TextInput } from 'react-native';

import { useStyle } from '../../hooks';

type Props = {
  type: string;
  value?: string;
  placeholder?: string;
  className?: string;

}

export const InputText: React.FC<Props> = (props) => {
  const { type = 'text', value = '', placeholder = '', className = 'input' } = props;
  const [inputStyle] = useStyle(className);

  return <TextInput
    secureTextEntry={type == 'password' ? true : false}
    style={inputStyle}
    value={value}
    placeholder={placeholder}
    onChangeText={() => console.log('change t')}
  />
}