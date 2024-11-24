import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  publicRoutes,
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
} from "./Routes";
import Root from "./Root";

const App = () => {
  const routes = [
    ...publicRoutes,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ];

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        children: routes,
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
      },
    }
  );

  return <RouterProvider router={router} />;
};

export default App;
