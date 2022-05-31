import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeContext } from '../../../contexts/theme.context';
import { cssStyle } from '../../../utils';

export const Welcome: React.FC = () => {
  const { styles, setTheme } = useContext(ThemeContext);
  const wrapper = cssStyle('wrapper', styles);
  const container = cssStyle('container', styles);

  return <SafeAreaView style={wrapper}>
    <View style={container}>
      <Text>Welcome there</Text>
    </View>
  </SafeAreaView>
}