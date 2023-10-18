import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Partial } from "@/components";

const Migration = Partial(lazy(() => import('./migration.page')));
const MigrationForm = Partial(lazy(() => import('./migration.form')));

const MigrationCategory = Partial(lazy(() => import('./category/migration-category.page')));
const MigrationScript = Partial(lazy(() => import('./script/migration-script.page')));

function MigrationRoute() {

  const routes = useRoutes([
    {
      path: '/categories',
      element: <MigrationCategory route="manage" page="migration" view="migration_category" />
    },
    {
      path: '/scripts',
      element: <MigrationScript route="manage" page="migration" view="migration_script" />
    },
    {
      path: '/:id',
      element: <MigrationForm route="manage" page="migration" />
    },
    {
      path: '/',
      element: <Migration route="manage" page="migration" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default MigrationRoute;
