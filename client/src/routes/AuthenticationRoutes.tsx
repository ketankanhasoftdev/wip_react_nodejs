import { useRoutes } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import PageNotFound from "../views/404";
import AuthComponent from "../views/auth/AuthComponent";

const AuthenticationRoutes = () => {
  const list = {
    path: "/",
    element: <AuthComponent />,
    children: [
      {
        path: "/", // Add this route for the index route
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  };

  return useRoutes([list]);
};

export default AuthenticationRoutes;
