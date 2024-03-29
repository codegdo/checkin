
import { createBrowserRouter } from "react-router-dom";

import AuthGuard from "./components/guard/auth.guard";
import AuthRoute from "./pages/auth/auth.route";
import DashboardRoute from "./pages/dashboard/dashboard.route";
import AccountRoute from "./pages/account/account.route";
import AdminRoute from "./pages/admin/admin.route";
import IamRoute from "./pages/iam/iam.route";
import BuilderRoute from "./pages/builder/builder.route";

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
      },
      {
        path: '/iam/*',
        element: <IamRoute />
      },
      {
        path: '/builder/*',
        element: <BuilderRoute />
      },
      {
        path: '/admin/*',
        element: <AdminRoute />
      },
      {
        path: '/*',
        element: <DashboardRoute />
      }
    ]
  }
];

export const router = createBrowserRouter(routes);