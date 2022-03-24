import React from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../../components/page';
import { Template, lazy } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./setup.index')));
const UserList = Template(lazy(() => import('./user/user.list')));
const UserForm = Template(lazy(() => import('./user/user.form')));
const ClientList = Template(lazy(() => import('./client/client.list')));
const GroupList = Template(lazy(() => import('./group/group.list')));
const GroupForm = Template(lazy(() => import('./group/group.form')));
const PolicyList = Template(lazy(() => import('./policy/policy.list')));
const PolicyForm = Template(lazy(() => import('./policy/policy.form')));

export const SetupRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="setup" page="index" />
    },
    {
      path: 'users/:id',
      element: <UserForm route="setup" page="users" />
    },
    {
      path: 'users',
      element: <UserList route="setup" page="users" />
    },
    {
      path: 'clients',
      element: <ClientList route="setup" page="clients" />
    },
    {
      path: 'groups/:id',
      element: <GroupForm route="setup" page="groups" />
    },
    {
      path: 'groups',
      element: <GroupList route="setup" page="groups" />
    },
    {
      path: 'policies/:id',
      element: <PolicyForm route="setup" page="policies" />
    },
    {
      path: 'policies',
      element: <PolicyList route="setup" page="policies" />
    },
    {
      path: '*',
      element: <NotFound route="setup" page="notfound" />
    },
  ]);

  return <>{routes}</>;
};