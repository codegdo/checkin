import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import TemplateLoader from "../../components/loader/template.loader";

const Index = TemplateLoader(lazy(() => import('./account.index')));

function AccountRoute() {

  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="account" page="index" />
    },
    {
      path: '*',
      element: <div>not found account</div>
    }
  ]);

  return routes;
}

export default AccountRoute;
