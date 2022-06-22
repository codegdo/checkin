import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { AppState } from './store/reducers';
import { AppRoute } from './app.route';
import { AuthRoute } from './screens/auth/auth.route';

export const App: React.FC = () => {
  const { user } = useSelector((state: AppState) => state.session);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {
          !user ? <AuthRoute /> : <AppRoute />
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


