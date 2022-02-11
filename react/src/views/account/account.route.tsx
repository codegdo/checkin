import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

//const Index = Template(lazy(() => import('./setup.index')));
const User = Template(lazy(() => import('./profile/profile.page')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const AccountRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="profile" />
    },
    {
      path: 'profile',
      element: <User page="profile" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};