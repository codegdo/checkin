import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Index = LoaderTemplate(lazy(() => import('./iam.index')));
const PolicyRoute = LoaderTemplate(lazy(() => import('./policy/policy.route')));

function IamRoute() {

  const routes = useRoutes([
    {
      path: '/policies/*',
      element: <PolicyRoute module="iam" view="policies" />
    },
    {
      path: '/',
      element: <Index module="policy" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default IamRoute;
