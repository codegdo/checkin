
import { createBrowserRouter } from "react-router-dom";

import AuthGuard from "./components/guard/auth.guard";
import AuthRoute from "./pages/auth/auth.route";
import DashboardRoute from "./pages/dashboard/dashboard.route";
import AccountRoute from "./pages/account/account.route";
import ManageRoute from "./pages/manage/manage.route";

const routes = [
  {
    path: '/auth/*',
    element: <AuthRoute />
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/account/*',
        element: <AccountRoute />
      }
    ]
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/manage/*',
        element: <ManageRoute />
      }
    ]
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/*',
        element: <DashboardRoute />
      }
    ]
  },
];

export const router = createBrowserRouter(routes);