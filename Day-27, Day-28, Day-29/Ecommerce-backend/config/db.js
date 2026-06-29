const mongoose = require("mongoose");

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Failed to Connect DB", error);
  }
};

module.exports=DBConnection;