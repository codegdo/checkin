import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { LoginForm } from './screens/auth/login/login.form';
import { StyledStatusBar } from './components/element/status-bar.component';
import { cssStyle } from './utils';
import { ThemeContext } from './contexts/theme.context';
import { Welcome } from './screens/home/welcome/welcome';
import { useSelector } from 'react-redux';
import { AppState } from './store/reducers';
import { Menu } from './app.route';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const App: React.FC = () => {
  const { user } = useSelector((state: AppState) => state.session);
  const { styles, setTheme } = useContext(ThemeContext);
  const wrapper = cssStyle('wrapper', styles);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {
          !user ? <>
            <StyledStatusBar />
            <SafeAreaView style={wrapper}>
              <Stack.Navigator>
                <Stack.Group>
                  <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }}></Stack.Screen>
                </Stack.Group>
              </Stack.Navigator>
            </SafeAreaView>
          </> : <>
            <StyledStatusBar />
            <SafeAreaView style={wrapper}>
              <Tab.Navigator>
                <Tab.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Tab.Screen name="TabMenu" component={Menu} options={{ headerShown: false }} />
              </Tab.Navigator>
            </SafeAreaView>
          </>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


