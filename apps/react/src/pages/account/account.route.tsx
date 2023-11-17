import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Index = LoaderTemplate(lazy(() => import('./account.index')));
const Profile = LoaderTemplate(lazy(() => import('./profile/profile.page')));

function AccountRoute() {

  const routes = useRoutes([
    {
      path: '/profile',
      element: <Profile module="account" view="profile" />
    },
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
