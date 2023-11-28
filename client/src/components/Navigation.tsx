import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";

import { PiUserCircleGearFill } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { FaUsersGear } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { userReducer } from "../redux/slices/authSlice";
import ThemeSwitch from "./ThemeSwitch";
const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(userReducer({}));
    navigate("/");
  };

  return (
    <Box
      sx={{
        background: themeMode === "dark" ? "#551657" : "#0B6BCB",
        p: 1,
        px: 2,
        position: "fixed",
        top: "0",
        zIndex: "2 !important",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {userDetails.isLoggedIn ? (
        <Avatar
          onClick={() => setOpen(true)}
          alt={userDetails.name}
          src={`https://robohash.org/${userDetails._id}`}
          sx={{
            background: themeMode === "dark" ? "#340436" : "#084278",
            p: 0,
            ":hover": {
              cursor: "pointer",
            },
            height: "50px",
            width: "50px",
          }}
        />
      ) : (
        <PiUserCircleGearFill size={50} color="white" />
      )}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        size="sm"
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pb: 0,
          }}
        >
          <Box>
            <Avatar
              alt={userDetails.name}
              src={`https://robohash.org/${userDetails._id}`}
              sx={{
                background: themeMode === "dark" ? "#340436" : "#084278",
                height: "150px",
                width: "150px",
                mb: 1,
                mt: 2,
                mx: "auto",
              }}
            />
            <Typography
              level="h2"
              sx={{
                color: themeMode === "dark" ? "white" : "black",
                textAlign: "center",
              }}
            >
              {userDetails.name}
            </Typography>
            <Typography
              sx={{
                color: themeMode === "dark" ? "white" : "black",
                textAlign: "center",
                pb: 1,
              }}
            >
              {userDetails.email}
            </Typography>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Button
                onClick={() => {
                  navigate("/account");
                  setOpen(false);
                }}
                sx={{ borderRadius: "5px" }}
              >
                View Profile
              </Button>
            </Box>
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate("/user-list");
                    setOpen(false);
                  }}
                >
                  <ListItemDecorator>
                    <FaUsersGear />
                  </ListItemDecorator>
                  <ListItemContent>User List</ListItemContent>
                  <FaAngleRight />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box>
            <List>
              <ListItem onClick={handleLogout}>
                <ListItemButton
                  onClick={() => {
                    navigate("/user-list");
                    setOpen(false);
                  }}
                >
                  <ListItemDecorator>
                    <FiLogOut />
                  </ListItemDecorator>
                  <ListItemContent>Logout</ListItemContent>
                  <FaAngleRight />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
      <ThemeSwitch themeMode={themeMode} />
    </Box>
  );
};

export default Navigation;
