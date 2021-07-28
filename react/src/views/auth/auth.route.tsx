import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
//import { RouteGuard } from '../../components/route/route.guard';
import { Template } from '../../components/template/template.component';

const login = lazy(() => import('./login/login.page'));
const logout = lazy(() => import('./logout/logout.page'));
const signup = lazy(() => import('./signup/signup.page'));
const notfound = lazy(() => import('../notfound.component'));

export const AuthRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: 'login',
      element: <Template name="login" component={login} />
    },
    {
      path: 'logout',
      element: <Template name="logout" component={logout} />
    },
    {
      path: 'signup',
      element: <Template name="signup" component={signup} />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};