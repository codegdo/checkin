import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GridviewScreen } from './gridview/gridview.screen';

const Stack = createNativeStackNavigator();

export const ConfigRoute = () => {
  return (
    <Stack.Navigator>

      <Stack.Group>
        <Stack.Screen name="gridview" component={GridviewScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}