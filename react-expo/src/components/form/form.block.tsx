import React, { useContext } from 'react';
import { View } from 'react-native';

import { ThemeContext } from '../../contexts/theme.context';
import { cssStyle } from '../../utils';

type Props = {
  name?: string;
  title?: string;
  className?: string;
}

export const Block: React.FC<Props> = ({ className = 'block', children, ...props }) => {
  const { styles } = useContext(ThemeContext);
  const block = cssStyle(className, styles);

  return <View style={block}>
    <>{children}</>
  </View>
}