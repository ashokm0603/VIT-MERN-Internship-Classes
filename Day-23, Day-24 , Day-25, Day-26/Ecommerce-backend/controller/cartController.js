const mongoose = require("mongoose");
const Cart = require("../model/CartModel");

//add cart products
const AddCartProducts = async (req, res) => {
  try {
    const cartFound = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(req.query.userId),
    });

    console.log(cartFound);

    if (cartFound == null) {
      await Cart.insertOne({
        userId: req.query.userId,
        productIds: req.query.productId,
      });
    } else {
      await Cart.updateOne(
        { userId: req.query.userId },
        { $addToSet: { productIds: req.query.productId } },
      );
    }
    res.status(200).json({ message: "cart added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add product" });
  }
};

//get cart Product details
const GetCartProducts = async (req, res) => {
  try {
    const Products = await Cart.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.query.userId) } },
      { $unwind: "$productIds" },
      {
        $lookup: {
          from: "products",
          localField: "productIds",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $project: { products: 1 },
      },
    ]);

    res.status(200).json({ Products });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "failed to get cart details" });
  }
};

// remove cart product based on product ID
const removeCart = async (req, res) => {
  try {
    const RemovedProducts = await Cart.updateOne(
      { userId: new mongoose.Types.ObjectId(req.query.userId) },
      {
        $pull: {
          productIds: new mongoose.Types.ObjectId(req.query.productId),
        },
      },
    );

    res.status(200).json({ message: "removed successfully", RemovedProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to remove cart details" });
  }
};

//clear all cart Products

const ClearCartProducts = async (req, res) => {
  try {
    const clearedResponse=await Cart.updateOne(
      { userId: new mongoose.Types.ObjectId(req.query.userId) },
      {
        $set: { productIds: [] },
      },
    );

    res.status(200).json({message:"clear all products in cart",clearedResponse})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to clear cart details" });
  }
};

module.exports = { AddCartProducts, GetCartProducts, removeCart,ClearCartProducts };
