import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const admin = lazy(() => import('./admin.index'));
const user = lazy(() => import('./user/user.page'));
const notfound = lazy(() => import('../notfound.component'));

export const AdminRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="admin" component={admin} />
    },
    {
      path: 'users',
      element: <Template name="users" component={user} />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};