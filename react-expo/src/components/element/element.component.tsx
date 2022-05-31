import React, { useContext } from 'react';
import { View, TextInput } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';
import { Button } from './element.button';



export const Element: React.FC = (props) => {
  const { styles: { input } } = useContext(ThemeContext);

  return <>
    <Button {...props} />
  </>
}
