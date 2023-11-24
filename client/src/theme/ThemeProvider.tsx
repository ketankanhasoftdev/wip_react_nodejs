import * as React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";
import NavigationBar from "../components/NavigationBar";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "#551657",
          solidHoverBg: "#431545",
        },
        focusVisible: "#551657",
      },
    },
  },
});

const ThemeContainer = (props: any) => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          zIndex: "2 !important",
          width: "100%",
        }}
      >
        <NavigationBar />
      </Box>
      <CssVarsProvider
        defaultMode={props.mode}
        theme={theme}
        colorSchemeSelector="#demo_dark-mode-by-default"
        modeStorageKey="demo_dark-mode-by-default"
        disableNestedContext
      >
        <Box id="demo_dark-mode-by-default">
          <Sheet sx={{ px: 3, py: 1.5, borderRadius: 0 }}>
            <Box className={`dark-parent-container h-100vh`}>
              {props.children}
            </Box>
          </Sheet>
        </Box>
      </CssVarsProvider>
    </>
  );
};

export default ThemeContainer;
