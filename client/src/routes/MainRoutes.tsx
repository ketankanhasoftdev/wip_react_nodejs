import { useRoutes } from "react-router-dom";
import PageNotFound from "../views/404";

const MainRoutes = () => {
  const list = {
    path: "/",
    element: <></>,
    children: [
      {
        path: "/",
        element: <></>,
      },
      {
        path: "home",
        element: <></>,
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
