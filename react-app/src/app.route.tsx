import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteGuard } from './components/route/route.guard';

import { AuthRoute, HomeRoute, SetupRoute } from './views';

export const AppRoute: FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <RouteGuard path='/*' element={<HomeRoute />} />
    },
    {
      path: '/setup/*',
      element: <RouteGuard path='/*' element={<SetupRoute />} />
    },
    {
      path: '/auth/*',
      element: <AuthRoute />
    },
  ]);

  return <>{routes}</>;
};