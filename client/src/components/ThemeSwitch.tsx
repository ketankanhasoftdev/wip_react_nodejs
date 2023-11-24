import * as React from "react";
import Switch from "@mui/joy/Switch";
import { PiMoonBold } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { manageTheme } from "../redux/slices/themeSlice";
export default function ExampleThumbChild() {
  const dispatch = useDispatch<AppDispatch>();
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const handleThemeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? dispatch(manageTheme("dark"))
      : dispatch(manageTheme("light"));
  };
  return (
    <Switch
      color={themeMode === "dark" ? "neutral" : "neutral"}
      size="lg"
      slotProps={{
        input: { "aria-label": "Dark mode" },
        thumb: {
          children:
            themeMode === "dark" ? (
              <PiMoonBold
                color="white"
                style={{
                  background: "black",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <FiSun color="black" />
            ),
          backgroundColor: "red",
        },
        track: {
          sx: { background: themeMode === "dark" ? "#353536" : "#d7d7db" },
        },
      }}
      sx={{
        "--Switch-thumbSize": "16px",
      }}
      onChange={handleThemeSwitch}
    />
  );
}
