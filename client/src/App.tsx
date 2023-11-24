import * as React from "react";
import ThemeProvider from "./theme/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import UserRoutes from "./routes";
const App = () => {
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const { userDetails } = useSelector((state: RootState) => state.authState);
  React.useEffect(() => {
    const body = document.querySelector("body");
    if (themeMode === "dark") {
      body?.classList.add("dark-mode");
    } else {
      body?.classList.remove("dark-mode");
    }
  }, [themeMode]);

  return (
    <ThemeProvider mode={themeMode}>
      <UserRoutes isLoggedIn={Boolean(userDetails?.isLoggedIn)} />
    </ThemeProvider>
  );
};

export default App;
