import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './contexts/theme.context';
import { LoginForm } from './screens/auth/login/login.form';
import { lightTheme } from './assets/styles/themes';
import { StyledStatusBar } from './components/element/status-bar.component';

const Stack = createNativeStackNavigator();

export const App: React.FC = () => {

  return (
    <SafeAreaProvider>
      <ThemeProvider initial={lightTheme}>
        <StyledStatusBar />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }}></Stack.Screen>
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


