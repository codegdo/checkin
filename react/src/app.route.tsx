import React from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteGuard } from './components/route/route.guard';
import { AuthRoute, AdminRoute } from './views';

export const AppRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/auth*',
      element: <AuthRoute />
    },
    {
      path: '/admin*',
      element: <RouteGuard path='/' element={<AdminRoute />} />
    },
  ]);

  return <>{routes}</>;
};