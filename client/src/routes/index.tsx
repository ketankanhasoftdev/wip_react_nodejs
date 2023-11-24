import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";

const UserRoutes = (props: { isLoggedIn: boolean }) => {
  return (
    <BrowserRouter>
      {props.isLoggedIn ? <MainRoutes /> : <AuthenticationRoutes />}
    </BrowserRouter>
  );
};

export default UserRoutes;
