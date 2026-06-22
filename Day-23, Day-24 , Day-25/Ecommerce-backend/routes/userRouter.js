const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  getAllUsers,
  DeleteUserBasedOnId,
  UpdateUserDetails,
  FilterUsers
} = require("../controller/userController");

router.post("/register", Register);
router.post("/login", Login);
router.get("/get-users", getAllUsers);
router.delete("/delete-user/:id", DeleteUserBasedOnId);
router.put("/update-user/:id", UpdateUserDetails);
router.get("/users",FilterUsers)

module.exports = router;
