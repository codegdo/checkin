import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Auth = Template(lazy(() => import('./auth.index')));

export const AuthRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <Auth page="auth" />
    }
  ]);

  return <>{routes}</>;
};