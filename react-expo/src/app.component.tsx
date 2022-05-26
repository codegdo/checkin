import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './contexts/theme.context';
import { LoginForm } from './screens/auth/login/login.form';

const Stack = createNativeStackNavigator();

export const App: React.FC = () => {

  return (
    <ThemeProvider initial={{}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginForm}></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


