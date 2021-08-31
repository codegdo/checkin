import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const Login = Partial(lazy(() => import('./login/login.page')));
const Logout = Partial(lazy(() => import('./logout/logout.page')));
const Signup = Partial(lazy(() => import('./signup/signup.page')));
const Checkin = Partial(lazy(() => import('./checkin/checkin.page')));
const Checkout = Partial(lazy(() => import('./checkout/checkout.page')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Auth: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="/" element={<Navigate to="login" />} />
    <Route path="login" element={<Login page="login" />} />
    <Route path="logout" element={<Logout page="logout" />} />
    <Route path="signup" element={<Signup page="signup" />} />
    <Route path="checkin" element={<Checkin page="checkin" />} />
    <Route path="checkout" element={<Checkout page="checkout" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default Auth;