import userModel from "../model/index.js";
// get all users
export const getAllUsers = async (req, res) => {
  const findAll = await userModel.find();
  try {
    res.status(200).json(findAll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get user by id
export const getUser = async (req, res) => {
  const data = await userModel.findById(req.params.id);
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// create user
export const createUser = async (req, res) => {
  const data = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user by id
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const options = { new: true };
  const results = await userModel.findByIdAndUpdate(id, updateData, options);
  try {
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete user by id
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const data = await userModel.findByIdAndDelete(id);
  try {
    res.status(200).json({ message: `User ${data.name} deleted successfully` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
