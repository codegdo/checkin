import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Template, lazy } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./account.index'), 1000));
const User = Template(lazy(() => import('./profile/profile.page')));
const NotFound = Template(lazy(() => import('../../components/page/notfound.page')));

export const AccountRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="account" page="account" />
    },
    {
      path: 'profile',
      element: <User route="account" page="profile" />
    },
    {
      path: '*',
      element: <NotFound route="account" page="notfound" />
    },
  ]);

  return <>{routes}</>;
};