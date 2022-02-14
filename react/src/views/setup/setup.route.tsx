import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../../components/page';
import { Template } from '../../components/template/template.component';


const Index = Template(lazy(() => import('./setup.index')));
const User = Template(lazy(() => import('./user/user.page')));
const UserForm = Template(lazy(() => import('./user/user.form')));
const Client = Template(lazy(() => import('./client/client.page')));

export const SetupRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="setup" page="index" />
    },
    {
      path: 'users/:id',
      element: <UserForm route="setup" page="user_form" />
    },
    {
      path: 'users',
      element: <User route="setup" page="user" />
    },
    {
      path: 'clients',
      element: <Client route="setup" page="client" />
    },
    {
      path: '*',
      element: <NotFound route="setup" page="notfound" />
    },
  ]);

  return <>{routes}</>;
};