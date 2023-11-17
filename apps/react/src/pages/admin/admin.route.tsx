import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Index = LoaderTemplate(lazy(() => import('./admin.index')));
const MigrationRoute = LoaderTemplate(lazy(() => import('./migration/migration.route')));

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
