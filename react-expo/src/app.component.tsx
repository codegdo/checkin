import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Timer } from './components/timer/timer.component';
import { Login } from './screens/auth/login/login.form';

export const App: React.FC = () => {
  const state = useSelector((state: any) => state);

  console.log(state);

  return (
    <View style={styles.container}>
      <Login />
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

