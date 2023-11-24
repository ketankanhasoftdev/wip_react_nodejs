import { Avatar, Box, Button, Card, Input, Typography } from "@mui/joy";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInputs } from "../../interface/interface";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
const Account = () => {
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const { themeMode } = useSelector((state: RootState) => state.themeState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>({
    defaultValues: {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    },
  });

  const [editState, setEditState] = React.useState<boolean>(false);

  const handleEditState = (state: boolean) => {
    setEditState(state);
    if (state) {
      const nameInput: any = document.querySelector("#name");
      setTimeout(() => {
        nameInput?.focus();
      }, 100);
    }
  };

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    console.log(data);
  };

  return (
    <Box
      className="h-100vh"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ position: "relative", pb: 4 }}>
        <Avatar
          src={`https://robohash.org/${userDetails._id}`}
          sx={{
            background: themeMode === "dark" ? "#340436" : "#084278",
            height: "10rem",
            width: "10rem",
            mx: "auto",
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 1 }}>
            <Input
              size="md"
              type="text"
              id="name"
              placeholder="Enter Name"
              error={Boolean(errors.name)}
              disabled={!editState}
              startDecorator={<FaUser />}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Typography className="error-message">
                Name cannot be blank
              </Typography>
            )}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Input
              size="md"
              type="email"
              placeholder="Enter Email"
              error={Boolean(errors.email)}
              disabled={!editState}
              startDecorator={<MdEmail />}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <Typography className="error-message">
                Email cannot be blank
              </Typography>
            )}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Input
              size="md"
              type="password"
              placeholder="Enter Name"
              error={Boolean(errors.password)}
              disabled={!editState}
              startDecorator={<MdKey />}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <Typography className="error-message">
                Password cannot be blank
              </Typography>
            )}
          </Box>
          {editState && (
            <Button type="submit" sx={{ width: "100%", mb: 1 }}>
              Update
            </Button>
          )}
        </form>
        {editState ? (
          <MdCancel
            className={`profile-edit-icon-${themeMode}`}
            onClick={() => handleEditState(false)}
          />
        ) : (
          <PiNotePencilBold
            onClick={() => handleEditState(true)}
            className={`profile-edit-icon-${themeMode}`}
          />
        )}
      </Card>
    </Box>
  );
};

export default Account;
