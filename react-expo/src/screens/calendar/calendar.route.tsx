import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CalendarIndex } from './calendar.index';

const Stack = createNativeStackNavigator();

export const CalendarRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="calendar-index" component={CalendarIndex} />
      </Stack.Group>
    </Stack.Navigator>
  );
}