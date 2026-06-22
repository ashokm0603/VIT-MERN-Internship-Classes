const Cart = require("../model/CartModel");

//add cart products
const AddCartProducts = async (req, res) => {
  try {
    const cartFound = await Cart.findById(req.query.userId);

    if (!cartFound) {
      await Cart.insertOne({
        userId: req.query.userId,
        productIds: req.query.productId,
      });
    } else {
      await Cart.updateOne(
        { userId: req.query.userId },
        { $push: { productIds: req.query.productId } },
      );
    }
    res.status(200).json({message:"cart added successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add product" });
  }
};


//get cart Products 


