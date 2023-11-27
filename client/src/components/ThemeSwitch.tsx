import * as React from "react";
import Switch from "@mui/joy/Switch";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { manageTheme } from "../redux/slices/themeSlice";
const ThemeSwitch = ({ themeMode }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleThemeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? dispatch(manageTheme("dark"))
      : dispatch(manageTheme("light"));
  };
  return (
    <Switch
      onChange={handleThemeSwitch}
      size="lg"
      slotProps={{
        input: { "aria-label": "Dark mode" },
        thumb: {
          children:
            themeMode === "dark" ? (
              <IoMdMoon
                color="white"
                style={{ background: "black", borderRadius: "50%" }}
                size={20}
              />
            ) : (
              <IoMdSunny />
            ),
          sx: {
            background: themeMode === "dark" ? "black" : "white",
          },
        },
        track: {
          sx: {
            background: themeMode === "dark" ? "" : "#0B6BCB",
          },
        },
      }}
      sx={{
        "--Switch-thumbSize": "20px",
      }}
    />
  );
};

export default ThemeSwitch;
