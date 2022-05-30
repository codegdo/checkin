import React, { useContext } from 'react';
import { View, TextInput } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';

type Props = {
  placeholder?: string;
}

export const Input: React.FC<Props> = (props) => {
  const { styles: { input } } = useContext(ThemeContext);

  return <>
    <TextInput style={input} placeholder={props.placeholder} />
  </>
}
