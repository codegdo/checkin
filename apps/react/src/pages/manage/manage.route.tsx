import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./manage.index')));
const MigrationRoute = Template(lazy(() => import('./migration/migration.route')));

function ManageRoute() {

  const routes = useRoutes([
    {
      path: '/migrations/*',
      element: <MigrationRoute module="manage" view="migration" />
    },
    {
      path: '/',
      element: <Index module="manage" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default ManageRoute;
