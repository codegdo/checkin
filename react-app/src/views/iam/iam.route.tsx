import React, { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./iam.index')));
const User = Template(lazy(() => import('./user/user.page')));
const UserForm = Template(lazy(() => import('./user/user.form')));
const Policy = Template(lazy(() => import('./policy/policy.page')));
const PolicyForm = Template(lazy(() => import('./policy/policy.form')));

export const IamRoute: FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="iam" page="index" />
    },
    {
      path: '/users',
      element: <User route="iam" page="users" />
    },
    {
      path: '/users/:id',
      element: <UserForm route="iam" page="users" />
    },
    {
      path: '/policies',
      element: <Policy route="iam" page="policies" />
    },
    {
      path: '/policies/:id',
      element: <PolicyForm route="iam" page="policies" />
    }
  ]);

  return <>{routes}</>;
};