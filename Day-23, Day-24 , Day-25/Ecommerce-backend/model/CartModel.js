const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: new mongoose.Types.ObjectId(), ref: "users" },
  productIds: [{ type: new mongoose.Types.ObjectId(), ref: "products" }],
});

module.exports=mongoose.model("cartProducts",cartSchema)