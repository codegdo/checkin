import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderPartial } from "@/components";

const Migration = LoaderPartial(lazy(() => import('./migration.list')));
const MigrationForm = LoaderPartial(lazy(() => import('./migration.form')));

const MigrationCategory = LoaderPartial(lazy(() => import('./migration-category/migration-category.list')));
const MigrationScript = LoaderPartial(lazy(() => import('./migration-script/migration-script.list')));

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
