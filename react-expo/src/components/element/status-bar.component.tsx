import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../contexts/theme.context';

export const StyledStatusBar: React.FC = () => {
  const { styles, theme: { COLOR } } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const { backgroundColor, barStyle } = styles["status-bar"] || { backgroundColor: COLOR.barBackground, barStyle: COLOR.barStyle };

  return <View style={{ height: insets.top, backgroundColor }}>
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
    />
  </View>
}