import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { AuthRoute, CheckinRoute, CheckoutRoute, AdminRoute, HomeRoute } from './views';
const NotFound = Template(lazy(() => import('./views/notfound.component')));

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
      path: '/checkin*',
      element: <CheckinRoute />
    },
    {
      path: '/checkout*',
      element: <CheckoutRoute />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};