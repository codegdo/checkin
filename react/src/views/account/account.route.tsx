import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Template, lazyLoad } from '../../components/template/template.component';

const Index = Template(lazyLoad(() => import('./account.index')));
const User = Template(lazyLoad(() => import('./profile/profile.page')));
const NotFound = Template(lazyLoad(() => import('../../components/page/notfound.page')));

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