import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import { IoMenu } from "react-icons/io5";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { PiUserCircleGearFill } from "react-icons/pi";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ThemeSwitch } from "./ThemeSwitch";
import { manageTheme } from "../redux/slices/themeSlice";
import { FiLogOut } from "react-icons/fi";
import { userReducer } from "../redux/slices/authSlice";
const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = ["Logout"];

const NavigationBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const innerTheme = createTheme({
    palette: {
      primary: {
        main: themeMode === "dark" ? "#551657" : "#0B6BCB",
      },
    },
  });

  const handleThemeSwitch = (event: any) => {
    event.target.checked
      ? dispatch(manageTheme("dark"))
      : dispatch(manageTheme("light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(userReducer({}));
  };

  return (
    <ThemeProvider theme={innerTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {userDetails.isLoggedIn ? (
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
                    <Avatar
                      alt={userDetails.name}
                      src={`https://robohash.org/${userDetails._id}`}
                      sx={{
                        background:
                          themeMode === "dark" ? "#340436" : "#084278",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Drawer
                  anchor="left"
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      pb: 1,
                    }}
                  >
                    <Box>
                      <Avatar
                        alt={userDetails.name}
                        src={`https://robohash.org/${userDetails._id}`}
                        sx={{
                          background:
                            themeMode === "dark" ? "#340436" : "#084278",
                          height: "150px",
                          width: "150px",
                          m: 2,
                        }}
                      />
                      <Typography
                        sx={{
                          color: themeMode === "dark" ? "white" : "black",
                          textAlign: "center",
                          py: 1,
                        }}
                        variant="h5"
                      >
                        {userDetails.name}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      sx={{
                        color: themeMode === "dark" ? "white" : "black",
                        width: "100%",
                        fontWeight: 600,
                      }}
                      endIcon={<FiLogOut />}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Box>
                </Drawer>
              </Box>
            ) : (
              <PiUserCircleGearFill size={50} />
            )}
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  sm: "none",
                  justifyContent: "end",
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <IoMenu />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem>
                  <ThemeSwitch onClick={handleThemeSwitch} />
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {/* {page} */}
                </Button>
              ))}
            </Box>
            {
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <ThemeSwitch onClick={handleThemeSwitch} />
              </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavigationBar;
