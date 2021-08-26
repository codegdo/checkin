import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Admin = Template(lazy(() => import('./admin.index')));
const User = Template(lazy(() => import('./user/user.page')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const AdminRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Admin page="admin" />
    },
    {
      path: 'users',
      element: <User page="users" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};