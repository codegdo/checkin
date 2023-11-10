import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./admin.index')));
const MigrationRoute = Template(lazy(() => import('./migration/migration.route')));

function AdminRoute() {

  const routes = useRoutes([
    {
      path: '/migrations/*',
      element: <MigrationRoute module="admin" view="migrations" />
    },
    {
      path: '/',
      element: <Index module="admin" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default AdminRoute;
