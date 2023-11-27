import * as React from "react";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import FloatingLabelInput from "../../components/StyledInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthInputs } from "../../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginThunk } from "../../redux/thunks/authThunk";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography["body-sm"],
  textAlign: "center",
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  // border: "1px solid",
  borderColor: theme.palette.divider,
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>();
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const { screenSize } = useSelector((state: RootState) => state.layoutState);
  const [inputType, setInputType] = React.useState("password");
  const [dividerState, setDividerState] = React.useState("vr");

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    dispatch(loginThunk({ ...data }));
  };

  const handleInputType = () => {
    inputType === "text" ? setInputType("password") : setInputType("text");
  };

  React.useEffect(() => {
    screenSize?.width < 600 ? setDividerState("hr") : setDividerState("vr");
  }, [screenSize]);

  return (
    <Box
      className="h-100vh"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Card sx={{ mx: "auto" }}>
        <Grid container sx={{ position: "relative" }}>
          <Grid xs={12} sm={6}>
            <Item>
              <Typography
                level="h2"
                sx={{
                  textAlign: "center",
                  color: themeMode === "dark" ? "white" : "#0B6BCB",
                }}
              >
                Login
              </Typography>
              <img
                src="/assets/images/login-illustration.png"
                style={{ maxWidth: "300px" }}
              />
            </Item>
          </Grid>
          {dividerState === "vr" ? (
            <Divider className="vr" orientation="vertical" />
          ) : (
            <Divider className="hr" orientation="horizontal" />
          )}
          <Grid xs={12} sm={6}>
            <Item>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabelInput
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholderText="Enter Email"
                  required={true}
                  errors={errors}
                  sx={{ mb: 2, width: "100%" }}
                />
                <FloatingLabelInput
                  register={register}
                  label="Password"
                  name="password"
                  type={inputType}
                  placeholderText="Enter Password"
                  required={true}
                  errors={errors}
                  endDecorator={
                    inputType === "password" ? (
                      <IoIosEyeOff
                        className="show-password-icon"
                        onClick={handleInputType}
                        size={20}
                      />
                    ) : (
                      <IoIosEye
                        className="show-password-icon"
                        onClick={handleInputType}
                        size={20}
                      />
                    )
                  }
                  sx={{ mb: 2, width: "100%" }}
                />
                <Button type="submit" sx={{ width: "100%" }}>
                  Login
                </Button>
              </form>
              <Typography sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Link className="link" to="/register">
                  Register
                </Link>{" "}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Login;
