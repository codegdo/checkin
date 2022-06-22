import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getTabBarStyle } from './helpers';
import { HomeScreen } from './screens/home/home.screen';
import { Nav } from './components';
import { SetupRoute } from './screens/setup/setup.route';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: getTabBarStyle(route) });
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="nav"
        component={Nav}
      />
      <Stack.Screen
        name="setup"
        component={SetupRoute}
      />
    </Stack.Navigator>
  )
}

export const AppRoute = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="menu" component={MenuStack} />
    </Tab.Navigator>
  );
}