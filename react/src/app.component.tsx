import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRouter } from './views';
import { Login } from './views/auth/login/login.component';

export const App: React.FC = (): JSX.Element | null => {
  return <BrowserRouter>
    <Routes>
      <Route path="auth" element={<AuthRouter />} children={<Login />} />
    </Routes>
  </BrowserRouter>;
}