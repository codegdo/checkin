import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Index = LoaderTemplate(lazy(() => import('./iam.index')));
const PolicyRoute = LoaderTemplate(lazy(() => import('./policy/policy.route')));
const UserList = LoaderTemplate(lazy(() => import('./user/user.list')));

function IamRoute() {

  const routes = useRoutes([
    {
      path: '/policies/*',
      element: <PolicyRoute module="iam" view="policies" />
    },
    {
      path: '/users',
      element: <UserList module="iam" view="users" />
    },
    {
      path: '/',
      element: <Index module="iam" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default IamRoute;
