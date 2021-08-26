import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const Login = Partial(lazy(() => import('./login/login.page')));
const Logout = Partial(lazy(() => import('./logout/logout.page')));
const Signup = Partial(lazy(() => import('./signup/signup.page')));
const Passcode = Partial(lazy(() => import('./passcode/passcode.page')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Auth: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="/" element={<Navigate to="login" />} />
    <Route path="login" element={<Login page="login" />} />
    <Route path="logout" element={<Logout page="logout" />} />
    <Route path="signup" element={<Signup page="signup" />} />
    <Route path="passcode" element={<Passcode page="passcode" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default Auth;