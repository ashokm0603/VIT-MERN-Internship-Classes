const express = require("express");
const app = express();
const env = require("dotenv");
const DBConnection = require("./config/db");
env.config();
app.use(express.json());
const PORT = process.env.PORT;
DBConnection(); // Db Connect function calling

const userRouter = require("./routes/userRouter");

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("Server Running on Port : ", PORT);
});
