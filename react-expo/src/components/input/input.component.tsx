import React, { useContext } from 'react';
import { View, TextInput } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';

export const Input: React.FC = () => {
  const { styles: { input } } = useContext(ThemeContext);

  return <>
    <TextInput style={input} />
  </>
}
