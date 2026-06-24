const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required:true },
  productIds: [{ type:  mongoose.Schema.Types.ObjectId, ref: "products" }],
});

module.exports=mongoose.model("cartProducts",cartSchema)