import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/index.js";

let router = express.Router();
// get all users
router.get("/users", getAllUsers);
// get user by id
router.get("/user/:id", getUser);
// create user
router.post("/user", createUser);
// update user by id
router.patch("/user/:id", updateUser);
// delete user by id
router.delete("/user/:id", deleteUser);

export default router;
