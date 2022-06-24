import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getTabBarStyle } from './helpers';
import { HomeScreen } from './screens/home/home.screen';
import { NavMenu } from './components';
import { SetupRoute } from './screens/setup/setup.route';
import { CalendarRoute } from './screens/calendar/calendar.route';
import { ConfigRoute } from './screens/config/config.route';
import { CalendarIndex } from './screens/calendar/calendar.index';
import { CalendarModal } from './screens/calendar/calendar.modal';
import { useScreenOption, useStyle } from './hooks';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Header = (props) => {
  console.log(props);
  return <View style={{ height: 30 }}></View>
}

const MenuStack = ({ navigation, route }) => {

  const [screenOptions] = useScreenOption();

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: getTabBarStyle(route) });
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Stack.Group>
        <Stack.Screen
          name="nav-menu"
          component={NavMenu}
          options={{ title: 'Menu' }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="config"
          component={ConfigRoute}
        />
        <Stack.Screen
          name="setup"
          component={SetupRoute}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const CalendarStack = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: getTabBarStyle(route) });
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="calendar-index" component={CalendarIndex} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="calendar-modal" component={CalendarModal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export const AppRoute = () => {
  const modules = {
    calendar: {
      label: 'calendar'
    }
  }
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="calendar-stack" component={CalendarStack} />
      <Tab.Screen name="menu-stack" component={MenuStack} />
    </Tab.Navigator>
  );
}

/* 
screenOptions={{ header: (props) => <Header {...props} /> }}
*/