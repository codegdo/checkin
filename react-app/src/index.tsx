import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//import './assets/css/index.scss';
import { store, persistor } from './app.store';
import { App } from './app.component';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from './app.theme';

((_window: Window): void => {
  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Theme />
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
})(window);