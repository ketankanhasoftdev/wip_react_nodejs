import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Avatar, Box, DialogActions, Input, Typography } from "@mui/joy";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInputs } from "../interface/interface";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateUserThunk } from "../redux/thunks/usersThunk";

const UserModalComponent = ({ open, setOpen, userData }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>();

  const [editState, setEditState] = React.useState<boolean>(false);
  const [inputType, setInputType] = React.useState("password");

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    dispatch(
      updateUserThunk({
        id: userData._id,
        name: data.name,
        email: data.email,
        password: data.password,
      })
    ).then(() => {
      setOpen(false);
      setEditState(false);
    });
  };

  const handleInputType = () => {
    inputType === "text" ? setInputType("password") : setInputType("text");
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Box sx={{ p: 2 }}>
          <Avatar
            src={`https://robohash.org/${userData._id}`}
            sx={{ height: "150px", width: "150px", mx: "auto", mb: 2 }}
          />
          <Box>
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
                  type={inputType}
                  placeholder="Enter Password"
                  error={Boolean(errors.password)}
                  disabled={!editState}
                  startDecorator={<MdKey />}
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
          </Box>
          <DialogActions>
            {!editState && (
              <Button
                variant="solid"
                type="button"
                sx={{ width: "100%", mb: 1 }}
                onClick={() => setEditState(true)}
              >
                Edit
              </Button>
            )}
          </DialogActions>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default UserModalComponent;
