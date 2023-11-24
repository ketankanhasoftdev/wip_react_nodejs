import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import UserRoutes from "./routes";
import Layout from "./layout";
import ThemeContainer from "./theme/ThemeProvider";
import { updateScreenSize } from "./redux/slices/layoutSlice";
import { userReducer } from "./redux/slices/authSlice";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  React.useEffect(() => {
    const body = document.querySelector("body");
    if (themeMode === "dark") {
      body?.classList.add("dark-mode");
    } else {
      body?.classList.remove("dark-mode");
    }
  }, [themeMode]);

  React.useEffect(() => {
    if (userData.email) {
      dispatch(userReducer({ ...userData }));
    }
    dispatch(
      updateScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  }, []);

  React.useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener("resize", () => {
      setTimeout(() => {
        dispatch(
          updateScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        );
      }, 2000);
    });

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <ThemeContainer mode={themeMode}>
      <Layout>
        <UserRoutes isLoggedIn={Boolean(userDetails?.isLoggedIn)} />
      </Layout>
    </ThemeContainer>
  );
};

export default App;
