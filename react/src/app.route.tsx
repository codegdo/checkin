import React from 'react';
import { useRoutes } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { AuthRoute, AdminRoute, HomeRoute, notfound } from './views';

export const AppRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '//*',
      element: <RouteGuard path='/' element={<HomeRoute />} />
    },
    {
      path: '/admin*',
      element: <RouteGuard path='/' element={<AdminRoute />} />
    },
    {
      path: '/auth*',
      element: <AuthRoute />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};