import * as React from "react";
import { Avatar, Box, Button, Table } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllUsers } from "../../redux/thunks/usersThunk";
import { UserType } from "../../interface/interface";
import UserModalComponent from "../../components/UserModalComponent";
import { PiNotePencilBold, PiTrashBold } from "react-icons/pi";
import DeletUserModal from "../../components/DeleteUserModal";
const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersList } = useSelector((state: RootState) => state.usersState);
  const [showUserDetails, setShowUserDetails] = React.useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = React.useState(false);
  const [userData, setUserData] = React.useState<UserType>({
    _id: "",
    name: "",
    email: "",
    password: "",
  });
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box>
      <Table aria-label="table variants" variant="outlined" hoverRow>
        <thead>
          <tr>
            <th>SR. No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: "22%" }}>Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((row: UserType, index: number) => (
            <tr key={row.name} className="table-row">
              <td>{index}</td>
              <td>
                <Avatar src={`https://robohash.org/${row._id}`} />
              </td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row._id}</td>
              <td>
                <Button
                  size="sm"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    setShowUserDetails(true);
                    setUserData({ ...row });
                  }}
                >
                  <PiNotePencilBold />
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    setUserData({ ...row });
                    setShowDeleteUserModal(true);
                  }}
                >
                  <PiTrashBold />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UserModalComponent
        open={showUserDetails}
        setOpen={setShowUserDetails}
        userData={userData}
        setUserData={setUserData}
      />
      <DeletUserModal
        open={showDeleteUserModal}
        setOpen={setShowDeleteUserModal}
        userData={userData}
      />
    </Box>
  );
};

export default UserList;
