import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from './app.route';

export const App: React.FC = (): JSX.Element | null => {
  return <StrictMode>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </StrictMode>;
}