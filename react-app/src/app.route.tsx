import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteGuard } from './components/route/route.guard';

import { AuthRoute, HomeRoute, IamRoute } from './views';

export const AppRoute: FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <RouteGuard path='/*' element={<HomeRoute />} />
    },
    {
      path: '/:id/iam/*',
      element: <RouteGuard path='/*' element={<IamRoute />} />
    },
    {
      path: '/auth/*',
      element: <AuthRoute />
    },
  ]);

  return <>{routes}</>;
};