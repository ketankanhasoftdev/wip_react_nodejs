import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";

// const theme = extendTheme({ cssVarPrefix: "demo" });

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

export default function ThemeProvider(props: any) {
  return props.mode === "dark" ? (
    <CssVarsProvider
      defaultMode="dark"
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the selector to apply CSS theme variables stylesheet.
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
      // set as root provider
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
  ) : (
    <CssVarsProvider
      defaultMode="light"
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the selector to apply CSS theme variables stylesheet.
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
      // set as root provider
      disableNestedContext
    >
      <Box id="demo_dark-mode-by-default">
        <Sheet sx={{ px: 3, py: 1.5, borderRadius: 0 }}>
          <Box className={`light-parent-container h-100vh`}>
            {props.children}
          </Box>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}
