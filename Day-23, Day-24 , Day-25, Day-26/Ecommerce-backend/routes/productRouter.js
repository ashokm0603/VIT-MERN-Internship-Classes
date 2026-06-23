const {
  AddProduct,
  GetProducts,
  GetProductBasedOnId,
  DeleteProduct,
  UpdateProduct,
  FilterProductsOnPrice,
  FilterProductsOnRatings,
} = require("../controller/productController");
const express = require("express");
const router = express.Router();

const verifiedUser = require("../middleware/authUser");

router.post("/add-product", verifiedUser, AddProduct);
router.get("/get-products", verifiedUser, GetProducts);
router.get("/get-product/:id", verifiedUser, GetProductBasedOnId);
router.delete("/delete-product/:id", verifiedUser, DeleteProduct);
router.put("/update-product/:id", verifiedUser, UpdateProduct);
router.get("/product-price", verifiedUser, FilterProductsOnPrice);
router.get("/products", verifiedUser, FilterProductsOnRatings);

module.exports = router;
