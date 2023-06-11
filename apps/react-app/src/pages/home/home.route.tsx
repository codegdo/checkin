import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import TemplateLoader from "../../components/loader/template.loader";

const Index = TemplateLoader(lazy(() => import('./home.index')));

function HomeRoute() {

  let routes = useRoutes([
    {
        element: <Index route="auth" page="index"  />,
        children: [
          {
            path: '/',
            element: <div>HOME</div>
          }
        ]
      },
      {
        path: '*',
        element: <div>not found home</div>
      }
]);

  return <>{routes}</>
}

export default HomeRoute;
