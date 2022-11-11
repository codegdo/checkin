import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./setup.index')));
const User = Template(lazy(() => import('./user/user.page')));
const Policy = Template(lazy(() => import('./user/user.page')));

export const SetupRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="setup" page="index" />
    },
    {
      path: '/users',
      element: <User route="setup" page="users" />
    },
    {
      path: '/policies',
      element: <User route="setup" page="policies" />
    }
  ]);

  return <>{routes}</>;
};