import React, { useContext } from 'react';
import { View } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';
import { cssStyle } from '../../utils';
import { Input } from '../input/input.component';

type Props = {
  id: string;
  type: string;
  name: string;
  className?: string;
  title?: string;
  placeholder?: string;
  role?: string;
}

export const Field: React.FC<Props> = ({ className = 'field', ...props }) => {
  const { styles } = useContext(ThemeContext);
  const field = cssStyle(className, styles);

  console.log(props);
  return <View style={field}>
    <Input {...props} />
  </View>
}