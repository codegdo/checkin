import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app.component';

((_window: Window): void => {
  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})(window);