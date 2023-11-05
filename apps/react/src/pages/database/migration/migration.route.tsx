import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Partial } from "@/components";

const Migration = Partial(lazy(() => import('./migration.page')));
const MigrationForm = Partial(lazy(() => import('./migration.form')));

const MigrationCategory = Partial(lazy(() => import('../migration-category/migration-category.page')));
const MigrationScript = Partial(lazy(() => import('../migration-script/migration-script.page')));

function MigrationRoute() {

  const routes = useRoutes([
    {
      path: '/migration-categories',
      element: <MigrationCategory module="manage" view="migration" object="migration_category" />
    },
    {
      path: '/migration-scripts',
      element: <MigrationScript module="manage" view="migration" object="migration_script" />
    },
    {
      path: '/:id',
      element: <MigrationForm module="manage" view="migration" />
    },
    {
      path: '/',
      element: <Migration module="manage" view="migration" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default MigrationRoute;
