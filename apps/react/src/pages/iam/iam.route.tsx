import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Template } from "@/components";

const Index = Template(lazy(() => import('./iam.index')));
const PolicyRoute = Template(lazy(() => import('./policy/policy.route')));

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
