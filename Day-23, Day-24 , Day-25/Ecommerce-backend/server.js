const express = require("express");
const app = express();
const env = require("dotenv");
const DBConnection = require("./config/db");
env.config();
app.use(express.json());
const PORT = process.env.PORT;
DBConnection(); // Db Connect function calling

const userRouter = require("./routes/userRouter");
const productsRouter=require("./routes/productRouter");
const aiRouter=require("./routes/aiRouter");

app.use("/api", userRouter);
app.use("/api", productsRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log("Server Running on Port : ", PORT);
});
