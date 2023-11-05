import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./database.index')));
//const MigrationRoute = Template(lazy(() => import('./migration/migration.route')));
const MigrationPage = Template(lazy(() => import('./migration/migration.page')));
const MigrationCategory = Template(lazy(() => import('./migration-category/migration-category.page')));
const MigrationScript = Template(lazy(() => import('./migration-script/migration-script.page')));

function DatabaseRoute() {

  const routes = useRoutes([
    {
      path: '/migrations',
      element: <MigrationPage module="database" view="migration" object="migartion" />
    },
    {
      path: '/migration-categories',
      element: <MigrationCategory module="database" view="migration_category" object="migration_category" />
    },
    {
      path: '/migration-scripts',
      element: <MigrationScript module="database" view="migration_script" object="migration_script" />
    },
    {
      path: '/',
      element: <Index module="database" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default DatabaseRoute;
