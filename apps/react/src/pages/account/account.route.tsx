import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./account.index')));

function AccountRoute() {

  const routes = useRoutes([
    {
      path: '/',
      element: <Index module="account" view="index" />
    },
    {
      path: '*',
      element: <div>not found account</div>
    }
  ]);

  return routes;
}

export default AccountRoute;
