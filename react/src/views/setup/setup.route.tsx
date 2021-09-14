import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

//const Index = Template(lazy(() => import('./setup.index')));
const User = Template(lazy(() => import('./user/user.page')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const SetupRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="users" />
    },
    {
      path: 'users',
      element: <User page="user" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};