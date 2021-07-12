import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const user = lazy(() => import('./user/user.component'));

export const AdminRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: 'users',
      element: <Template component={user} />
    },
  ]);

  return <>{routes}</>;
};