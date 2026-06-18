const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");

app.use(express.json());
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true, length: 10 },
  address: { type: String },
});

const userModel = mongoose.model("users", userSchema);

const dbConnection = require("./config/db");

dbConnection();

app.post("/add-user", async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };
    await userModel.insertOne(newUser);
    res.status(200).json({ message: "User added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add new user" });
  }
});

app.get("/get-users", async (req, res) => {
  try {
    const allUsers = await userModel.find();

    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get users" });
  }
});

app.listen(PORT, () => {
  console.log("Server Running on Port:", PORT);
});
