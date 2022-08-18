import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./setup.index')));
const User = Template(lazy(() => import('./user/user.page')));

export const SetupRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <User route="setup" page="user" />
    }
  ]);

  return <>{routes}</>;
};