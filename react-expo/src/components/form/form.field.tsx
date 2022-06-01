import React, { useContext } from 'react';
import { View } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';
import { useStyle } from '../../hooks';
import { Input } from '../input/input.component';
import { Element } from '../element/element.component';

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
  const [field, ...rest] = useStyle(className, styles);

  console.log(rest);

  return <View style={field}>
    {
      ['button', 'link'].includes(props.type)
        ? <Element {...props} />
        : <Input {...props} />
    }
  </View>
}