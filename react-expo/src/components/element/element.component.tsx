import React, { ReactNode, useContext } from 'react';
import { View, TextInput } from 'react-native';

import { Button } from './element.button';
import { ElementProps } from './element.type';

export const Element: React.FC<ElementProps> = (props) => {

  return <>
    <Button {...props} />
  </>
}
