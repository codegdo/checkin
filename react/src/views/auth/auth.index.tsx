import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const LoginForm = Partial(lazy(() => import('./login/login.form')));
const LogoutPage = Partial(lazy(() => import('./logout/logout.page')));
const SignupForm = Partial(lazy(() => import('./signup/signup.form')));
const VerifyForm = Partial(lazy(() => import('./verify/verify.form')));
const ResendForm = Partial(lazy(() => import('./resend/resend.form')));
const SetupForm = Partial(lazy(() => import('./setup/setup.form')));
const NotFoundPage = Partial(lazy(() => import('../../components/page/notfound.page')));

const Auth: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="/" element={<Navigate to="login" />} />
    <Route path="login" element={<LoginForm route="auth" page="login" />} />
    <Route path="logout" element={<LogoutPage route="auth" page="logout" />} />
    <Route path="signup" element={<SignupForm route="auth" page="signup" />} />
    <Route path="verify" element={<VerifyForm route="auth" page="verify" />} />
    <Route path="resend" element={<ResendForm route="auth" page="resend" />} />
    <Route path="setup" element={<SetupForm route="auth" page="setup" />} />
    <Route path="*" element={<NotFoundPage page="not-found" />} />
  </Routes>;
};

export default Auth;