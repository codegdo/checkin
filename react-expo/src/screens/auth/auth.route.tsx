import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginForm } from './login/login.form';

const Stack = createNativeStackNavigator();

export const AuthRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="login" component={LoginForm}></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}