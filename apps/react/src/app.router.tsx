
import { createBrowserRouter } from "react-router-dom";

import AuthGuard from "./components/guard/auth.guard";
import AuthRoute from "./pages/auth/auth.route";
import HomeRoute from "./pages/home/home.route";
import AccountRoute from "./pages/account/account.route";

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
        path: '/*',
        element: <HomeRoute />
      }
    ]
  },
];

export const router = createBrowserRouter(routes);