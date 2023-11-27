import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";
import Layout from "../layout";

const UserRoutes = (props: { isLoggedIn: boolean }) => {
  return (
    <BrowserRouter>
      <Layout>
        {props.isLoggedIn ? <MainRoutes /> : <AuthenticationRoutes />}
      </Layout>
    </BrowserRouter>
  );
};

export default UserRoutes;
