import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Timer } from './components/timer/timer.component';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

