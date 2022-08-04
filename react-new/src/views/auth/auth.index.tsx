import React, { lazy } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';

import { Partial } from '../../components/template/template.partial';

const Login = Partial(lazy(() => import('./login/login.page')));
const Signup = Partial(lazy(() => import('./signup/signup.page')));
const Logout = Partial(lazy(() => import('./logout/logout.page')));


const Index: React.FC = (): JSX.Element => {
  /* const { state } = useLocation();

  if (state) {
    const s = state as { logout: boolean };
    console.log(s.logout);
  } */

  return <Routes>
    <Route path="/" element={<Navigate to="login" />} />
    <Route path="login" element={<Login route="auth" page="login" />} />
    <Route path="signup" element={<Signup route="auth" page="signup" />} />
    <Route path="logout" element={<Logout route="auth" page="logout" />} />
  </Routes>;
};

export default Index;