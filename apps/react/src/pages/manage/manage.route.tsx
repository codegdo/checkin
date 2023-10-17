import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import TemplateLoader from "../../components/loader/template.loader";

const Index = TemplateLoader(lazy(() => import('./manage.index')));
const Migration = TemplateLoader(lazy(() => import('./migration/migration.page')));

function ManageRoute() {

  const routes = useRoutes([
    {
      path: '/migrations',
      element: <Migration route="manage" page="migrations" />
    },
    {
      path: '/',
      element: <Index route="manage" page="index" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default ManageRoute;
