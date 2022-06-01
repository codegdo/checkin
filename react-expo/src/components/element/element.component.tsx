import React, { ReactNode, useContext } from 'react';
import { View, TextInput } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';
import { Button } from './element.button';

type Props = {
  name: string;
  type: string;
  value?: string;
  title?: string;
  className?: string;
  callback?: () => void;
}

export const Element: React.FC<Props> = (props) => {

  return <>
    <Button {...props} />
  </>
}
