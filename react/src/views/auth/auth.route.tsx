import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Template, lazyLoad } from '../../components/template/template.component';

const Auth = Template(lazyLoad(() => import('./auth.index')));

export const AuthRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <Auth route="auth" page="auth" />
    }
  ]);

  return <>{routes}</>;
};