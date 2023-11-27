import { Box } from "@mui/joy";
import * as React from "react";
import Navigation from "../components/Navigation";

import Sheet from "@mui/joy/Sheet";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
const Layout = (props: any) => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: RootState) => state.authState);
  React.useEffect(() => {
    navigate("/");
  }, [userDetails]);

  return (
    <Box>
      <Navigation />
      <Sheet sx={{ px: 3, py: 1.5, borderRadius: 0 }}>{props.children}</Sheet>
    </Box>
  );
};

export default Layout;
