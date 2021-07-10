import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './login/login.component'

export const AuthRouter: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="login" element={<Login />} />
  </Routes>;
};