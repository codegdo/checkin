import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';
import { Input } from '../input/input.component';

export const Form: React.FC = () => {
  const { styles: { form, form_text } } = useContext(ThemeContext);

  return <View style={form} >
    <Text style={form_text}>hello there</Text>
    <Input />
  </View>
}
