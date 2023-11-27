import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import UserRoutes from "./routes";
import Layout from "./layout";
import ThemeContainer from "./theme/ThemeProvider";
import { updateScreenSize } from "./redux/slices/layoutSlice";
import { userReducer } from "./redux/slices/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@mui/joy";
import { notificationFail } from "./redux/slices/toastSlice";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const { toastState } = useSelector(
    (state: RootState) => state.notficationState
  );
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

  React.useEffect(() => {
    if (toastState.type === "success") {
      toast.success(toastState.message);
    } else if (toastState.type === "error") {
      toast.error(toastState.message);
    } else {
    }
  }, [toastState]);

  return (
    <ThemeContainer mode={themeMode}>
      <UserRoutes isLoggedIn={Boolean(userDetails?.isLoggedIn)} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1500,
          style: {
            background: themeMode === "dark" ? "#000" : "#fff",
            color: themeMode === "dark" ? "#fff" : "#000",
          },
        }}
      />
      {/* <Button onClick={() => dispatch(notificationFail("error"))}>toast</Button> */}
    </ThemeContainer>
  );
};

export default App;
