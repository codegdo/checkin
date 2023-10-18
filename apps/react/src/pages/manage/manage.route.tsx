import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./manage.index')));
const MigrationRoute = Template(lazy(() => import('./migration/migration.route')));

function ManageRoute() {

  const routes = useRoutes([
    {
      path: '/migrations/*',
      element: <MigrationRoute route="manage" page="migration" />
    },
    {
      path: '/',
      element: <Index route="manage" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default ManageRoute;
