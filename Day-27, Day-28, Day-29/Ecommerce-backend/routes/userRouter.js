const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  getAllUsers,
  DeleteUserBasedOnId,
  UpdateUserDetails,
  FilterUsers, getUserPagination
} = require("../controller/userController");


const verifiedUser=require("../middleware/authUser")

router.post("/register", Register);
router.post("/login", Login);
router.get("/get-users",verifiedUser, getAllUsers);
router.delete("/delete-user/:id",verifiedUser, DeleteUserBasedOnId);
router.put("/update-user/:id",verifiedUser, UpdateUserDetails);
router.get("/users",verifiedUser,FilterUsers)
router.get("/get-users-record",getUserPagination)

module.exports = router;
