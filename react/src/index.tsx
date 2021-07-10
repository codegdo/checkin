import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app.component';

((_window: Window): void => {
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
})(window);