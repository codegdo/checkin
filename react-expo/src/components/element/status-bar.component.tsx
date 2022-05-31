import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeContext } from '../../contexts/theme.context';
import { cssStyle } from '../../utils';

type Props = {
  className?: string;
}

export const StyledStatusBar: React.FC<Props> = ({ className = 'status-bar' }) => {

  const insets = useSafeAreaInsets();
  const { styles } = useContext(ThemeContext);
  const style = cssStyle(className, styles);

  const { backgroundColor, barStyle } = style as { backgroundColor: string; barStyle: 'default' };

  return <View style={{ height: insets.top, backgroundColor }}>
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
    />
  </View>
}