import React from 'react';
import { useRoutes } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { NotFound } from './components/page';
import { AuthRoute, CheckinRoute, ClockinRoute, ConfigRoute, AdminRoute, SetupRoute, AccountRoute, CalendarRoute, HomeRoute } from './views';

export const AppRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <RouteGuard path='/*' element={<HomeRoute />} />
    },
    {
      path: '/admin/*',
      element: <RouteGuard path='/*' element={<AdminRoute />} />
    },
    {
      path: '/config/*',
      element: <RouteGuard path='/*' element={<ConfigRoute />} />
    },
    {
      path: '/setup/*',
      element: <RouteGuard path='/*' element={<SetupRoute />} />
    },
    {
      path: '/account/*',
      element: <RouteGuard path='/*' element={<AccountRoute />} />
    },
    {
      path: '/calendar/*',
      element: <RouteGuard path='/*' element={<CalendarRoute />} />
    },
    {
      path: '/auth/*',
      element: <AuthRoute />
    },
    {
      path: '/checkin/*',
      element: <CheckinRoute />
    },
    {
      path: '/clockin/*',
      element: <ClockinRoute />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};