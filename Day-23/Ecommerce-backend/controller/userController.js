const Users = require("../model/UsersModel");
const bcrypt = require("bcrypt");
//register  api
const Register = async (req, res) => {
  try {
    const { FName, LName, Username, Password, dob, gender, city, state, zip } =
      req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    await Users.insertOne({
      FName: FName,
      LName: LName,
      Username: Username,
      Password: hashedPassword,
      dob: dob,
      gender: gender,
      city: city,
      state: state,
      zip: zip,
    });
    res.status(200).json({ message: "Register Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Register " });
  }
};

//login api

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await Users.findOne({ Username: username });
    const ComparedPassword = await bcrypt.compare(password, foundUser.Password);
    if (ComparedPassword) {
      res.status(200).json({ message: "Login Successful" });
    } else {
      res.status(400).json({ message: "invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Login" });
  }
};

//get all users api
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json({ message: "fetch successful", allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

//delete users api
const DeleteUserBasedOnId = async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "deleted successfully",
      deletedUserDetails: deletedUser,
    });
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user details" });
}
};

//update user api

const UpdateUserDetails = async(req, res) => {
  try {
      const updatedUser=  await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      res.status(200).json({
        message: "updated successfully",
        updatedUserDetails: updatedUser,
      });

} catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update" });
  }
};

module.exports = { Register, Login, getAllUsers, DeleteUserBasedOnId,UpdateUserDetails };
