import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Box, DialogActions, Typography } from "@mui/joy";
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
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Box sx={{ p: 2 }}>
          <Typography sx={{ my: 1, p: 1 }}>
            Are you sure want to delete this user?
          </Typography>
          <DialogActions>
            <Button
              variant="solid"
              color="success"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default DeletUserModal;
