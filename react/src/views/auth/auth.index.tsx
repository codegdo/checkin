import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const Login = Partial(lazy(() => import('./login/login.page')));
const Logout = Partial(lazy(() => import('./logout/logout.page')));
const Signup = Partial(lazy(() => import('./signup/signup.page')));
const Verify = Partial(lazy(() => import('./verify/verify.page')));
const Resend = Partial(lazy(() => import('./resend/resend.page')));
const Setup = Partial(lazy(() => import('./setup/setup.page')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Auth: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="/" element={<Navigate to="login" />} />
    <Route path="login" element={<Login page="login" />} />
    <Route path="logout" element={<Logout page="logout" />} />
    <Route path="signup" element={<Signup page="signup" />} />
    <Route path="verify" element={<Verify page="verify" />} />
    <Route path="resend" element={<Resend page="resend" />} />
    <Route path="setup" element={<Setup page="setup" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default Auth;