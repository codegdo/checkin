import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserScreen } from './user/user.screen';

const Stack = createNativeStackNavigator();

export const SetupRoute = () => {
  return (
    <Stack.Navigator>

      <Stack.Group>
        <Stack.Screen name="user" component={UserScreen}></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}