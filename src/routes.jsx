import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Record from "./screens/Record";
import Diary from "./screens/Diary";
import Analysis from "./screens/Analysis";
import Home from "./screens/Home";

const publicRoutes = [{ path: "/", element: <Home /> }];

const routesForNotAuthenticatedOnly = [
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
];

const routesForAuthenticatedOnly = [
  { path: "/record", element: <Record /> },
  { path: "/diary", element: <Diary /> },
  { path: "/analysis", element: <Analysis /> },
];

export {
  publicRoutes,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
