import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./setup.index')));
const User = Template(lazy(() => import('./user/user.page')));
const UserForm = Template(lazy(() => import('./user/user.form')));
const Policy = Template(lazy(() => import('./policy/policy.page')));
const PolicyForm = Template(lazy(() => import('./policy/policy.form')));

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
      path: '/users/:id',
      element: <UserForm route="setup" page="users" />
    },
    {
      path: '/policies',
      element: <Policy route="setup" page="policies" />
    },
    {
      path: '/policies/:id',
      element: <PolicyForm route="setup" page="policies" />
    }
  ]);

  return <>{routes}</>;
};