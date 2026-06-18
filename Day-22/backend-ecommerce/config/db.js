const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://admin:admin@ac-dpx27ft-shard-00-00.2aufazl.mongodb.net:27017,ac-dpx27ft-shard-00-01.2aufazl.mongodb.net:27017,ac-dpx27ft-shard-00-02.2aufazl.mongodb.net:27017/?ssl=true&replicaSet=atlas-ejc9ry-shard-0&authSource=admin&appName=ECommerce",
    );

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Failed to Connect DB", error);
  }
};

module.exports = dbConnection;
