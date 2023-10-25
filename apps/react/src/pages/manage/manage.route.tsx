import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./manage.index')));
//const MigrationRoute = Template(lazy(() => import('./migration/migration.route')));
const MigrationPage = Template(lazy(() => import('./migration/migration.page')));
const MigrationCategory = Template(lazy(() => import('./migration-category/migration-category.page')));
const MigrationScript = Template(lazy(() => import('./migration-script/migration-script.page')));

function ManageRoute() {

  const routes = useRoutes([
    {
      path: '/migrations',
      element: <MigrationPage module="manage" view="migration" object="migartion:migration_category:migration_script" />
    },
    {
      path: '/migration-categories',
      element: <MigrationCategory module="manage" view="migration" object="migration_category" />
    },
    {
      path: '/migration-scripts',
      element: <MigrationScript module="manage" view="migration" object="migration_script" />
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
