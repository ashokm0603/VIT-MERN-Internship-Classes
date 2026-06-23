const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FName: { type: String, required: true },
    LName: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("users", userSchema);
