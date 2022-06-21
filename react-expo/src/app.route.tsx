import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const MenuScreen: React.FC = ({ navigation }) => {
  return <>
    <Button title="Setup" onPress={() => navigation.push('SetupScreen')} />
  </>
}


const SetupScreen: React.FC = ({ navigation }) => {
  return <>
    <Button title="Menu" onPress={() => navigation.push('MenuScreen')} />
  </>
}


export const Menu = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetupScreen"
        component={SetupScreen}
      />
    </Stack.Navigator>
  )
}