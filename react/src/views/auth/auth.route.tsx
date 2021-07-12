import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteGuard } from '../../components/route/route.guard';
import { Template } from '../../components/template/template.component';

const login = lazy(() => import('./login/login.component'));
const signup = lazy(() => import('./signup/signup.component'));

export const AuthRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: 'login',
      element: <Template component={login} />
    },
    {
      path: 'signup',
      element: <RouteGuard path='/' element={<Template component={signup} />} />
    },
  ]);

  return <>{routes}</>;
};