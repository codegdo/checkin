import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Template, lazyLoad } from '../../components/template/template.component';
const NotFound = Template(lazyLoad(() => import('../../components/page/notfound.page')));

const Index = Template(lazyLoad(() => import('./home.index')));
const Welcome = Template(lazyLoad(() => import('./welcome/welcome')));

export const HomeRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="/" page="index" />
    },
    {
      path: '/welcome',
      element: <Welcome route="home" page="welcome" />
    },
    {
      path: '*',
      element: <NotFound route="home" page="not-found" />
    },
  ]);

  return <>{routes}</>;
};