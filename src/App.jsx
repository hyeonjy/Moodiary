import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  publicRoutes,
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
} from "./routes";
import Root from "./Root";

const App = () => {
  const routes = [
    ...publicRoutes,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
