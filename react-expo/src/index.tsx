import React from 'react';
import { StyleSheet, View } from 'react-native';
import { registerRootComponent } from 'expo';

import { App } from './app.component';

const Root: React.FC = () => {
  return (
    <View style={styles.container}>
      <App />
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

export default registerRootComponent(Root);