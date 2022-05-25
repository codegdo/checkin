import React from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../../components/page';
import { Template, lazyLoad } from '../../components/template/template.component';


const Index = Template(lazyLoad(() => import('./config.index')));

export const ConfigRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="config" page="index" />
    },
    {
      path: '*',
      element: <NotFound route="config" page="not-found" />
    },
  ]);

  return <>{routes}</>;
};