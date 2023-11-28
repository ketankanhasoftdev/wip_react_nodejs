import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Avatar, Box, DialogActions, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteUserThunk } from "../redux/thunks/usersThunk";

const DeletUserModal = ({ open, setOpen, userData }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useSelector((state: RootState) => state.authState);
  const handleDeleteUser = () => {
    dispatch(deleteUserThunk({ id: userData._id, userDetails })).then(() =>
      setOpen(false)
    );
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
          p: 2,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Box sx={{ p: 2 }}>
          <Typography level="h3" sx={{ my: 1, p: 1 }}>
            Are you sure want to delete this user?
          </Typography>
          <Box>
            <Avatar
              src={`https://robohash.org/${userData._id}`}
              sx={{ height: "150px", width: "150px", mx: "auto" }}
            />
            <Typography sx={{ my: 1, textAlign: "center" }} level="h4">
              {userData.name}
            </Typography>
            <Typography sx={{ my: 1, textAlign: "center" }}>
              {userData.email}
            </Typography>
          </Box>
          <DialogActions sx={{ mt: 3 }}>
            <Button variant="solid" color="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
            <Button
              variant="solid"
              color="success"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default DeletUserModal;
