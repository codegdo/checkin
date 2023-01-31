import { createBrowserRouter } from "react-router-dom";
import { App } from "./app.component";

import { AuthGuard } from "./components";
import { AuthRoute, HomeRoute, IamRoute } from './views';

const routes = [
  {
    element: <App />,
    children: [
      {
        element: <AuthRoute />,
        path: 'auth/*'
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <IamRoute />,
            path: 'iam/*'
          },
          {
            element: <HomeRoute />,
            path: '/'
          }
        ]
      },
    ]
  }
];

export const router = createBrowserRouter(routes);