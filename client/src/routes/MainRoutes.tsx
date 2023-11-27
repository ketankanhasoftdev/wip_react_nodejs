import { useRoutes } from "react-router-dom";
import PageNotFound from "../views/404";
import MainComponent from "../views/main/MainComponent";
import Account from "../views/main/Account";
import UserList from "../views/main/UserList";

const MainRoutes = () => {
  const list = {
    path: "/",
    element: <MainComponent />,
    children: [
      {
        path: "/",
        element: <Account />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  };
  return useRoutes([list]);
};

export default MainRoutes;
