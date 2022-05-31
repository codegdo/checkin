import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from './contexts/theme.context';
import { lightTheme } from './assets/styles/themes';

import { store, persistor } from './app.store';
import { App } from './app.component';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider initial={lightTheme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default registerRootComponent(Root);