import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserScreen } from './user/user.screen';
import { NavSetup } from '../../components/nav/nav.setup';
import { getTabBarStyle } from '../../helpers';
import { useScreenOption } from '../../hooks';

const Stack = createNativeStackNavigator();

export const SetupRoute = ({ navigation }) => {

  const [screenOptions] = useScreenOption();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Stack.Navigator screenOptions={{ ...screenOptions }}>
      <Stack.Group>
        <Stack.Screen
          name="nav-setup"
          component={NavSetup}
          options={{ title: '' }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="user"
          component={UserScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}