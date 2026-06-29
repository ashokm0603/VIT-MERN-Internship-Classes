const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: String },
    description: { type: String },
    imageSrc: { type: Array },
    about: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports=mongoose.model("products",productSchema);