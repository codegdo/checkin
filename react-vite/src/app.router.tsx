import { createBrowserRouter } from "react-router-dom";
import { App } from "./app.component";

import { AuthGuard } from "./components";
import { AuthRoute, HomeRoute, IamRoute } from './views';

const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/auth/*',
        element: <AuthRoute />
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: '/iam/*',
            element: <IamRoute />
          },
          {
            path: '/*',
            element: <HomeRoute />
          }
        ]
      }
    ]
  }
];

export const router = createBrowserRouter(routes);