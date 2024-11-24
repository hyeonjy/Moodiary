import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import DiaryList from "./screens/DiaryList";
import Diary from "./screens/Diary";
import Analysis from "./screens/Analysis";
import Home from "./screens/Home";
import DiaryForm from "./screens/DiaryForm";
import EditDiary from "./screens/EditDiary";

const publicRoutes = [{ path: "/", element: <Home /> }];

const routesForNotAuthenticatedOnly = [
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
];

const routesForAuthenticatedOnly = [
  { path: "/diary/:year/:month", element: <DiaryList /> },
  { path: "/diary", element: <Diary /> },
  { path: "/new-diary", element: <DiaryForm /> },
  { path: "/edit-diary/:id", element: <EditDiary /> },
  { path: "/analysis", element: <Analysis /> },
];

export {
  publicRoutes,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
