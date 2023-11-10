import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Partial } from "@/components";

const Migration = Partial(lazy(() => import('./migration.page')));
const MigrationForm = Partial(lazy(() => import('./migration.form')));

const MigrationCategory = Partial(lazy(() => import('./migration-category/migration-category.page')));
const MigrationScript = Partial(lazy(() => import('./migration-script/migration-script.page')));

function MigrationRoute() {

  const routes = useRoutes([
    {
      path: '/migration-categories',
      element: <MigrationCategory module="admin" view="migrations" />
    },
    {
      path: '/migration-scripts',
      element: <MigrationScript module="admin" view="migrations" />
    },
    {
      path: '/:id',
      element: <MigrationForm module="admin" view="migrations" />
    },
    {
      path: '/',
      element: <Migration module="admin" view="migrations" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default MigrationRoute;
