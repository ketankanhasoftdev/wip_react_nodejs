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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { updateUserThunk } from "../redux/thunks/usersThunk";

const UserModalComponent = ({ open, setOpen, userData, setUserData }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const [inputType, setInputType] = React.useState("password");

  const handleInputType = () => {
    inputType === "text" ? setInputType("password") : setInputType("text");
  };

  const handleSubmit = () => {
    dispatch(
      updateUserThunk({
        ...userData,
        userDetails: userDetails,
      })
    ).then(() => {
      setOpen(false);
    });
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
            <Box sx={{ mb: 1 }}>
              <Input
                size="md"
                type="text"
                id="name"
                placeholder="Enter Name"
                value={userData["name"]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserData({
                    ...userData,
                    ["name"]: e.target.value,
                  });
                }}
                startDecorator={<FaUser />}
              />
              {/* {errors.name && (
                  <Typography className="error-message">
                    Name cannot be blank
                  </Typography>
                )} */}
            </Box>
            <Box sx={{ mb: 1 }}>
              <Input
                size="md"
                type="email"
                placeholder="Enter Email"
                value={userData["email"]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserData({
                    ...userData,
                    ["email"]: e.target.value,
                  });
                }}
                startDecorator={<MdEmail />}
              />
              {/* {errors.email && (
                  <Typography className="error-message">
                    Email cannot be blank
                  </Typography>
                )} */}
            </Box>
            <Box sx={{ mb: 1 }}>
              <Input
                size="md"
                type={inputType}
                placeholder="Enter Password"
                value={userData["password"]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserData({
                    ...userData,
                    ["password"]: e.target.value,
                  });
                }}
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
              />
              {/* {errors.password && (
                  <Typography className="error-message">
                    Password cannot be blank
                  </Typography>
                )} */}
            </Box>

            <Button onClick={handleSubmit} sx={{ width: "100%", mb: 1 }}>
              Update
            </Button>
          </Box>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default UserModalComponent;
