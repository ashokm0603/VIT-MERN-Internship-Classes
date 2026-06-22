const {
  AddProduct,
  GetProducts,
  GetProductBasedOnId,
  DeleteProduct,
  UpdateProduct,
  FilterProductsOnPrice,
  FilterProductsOnRatings,
} = require("../controller/productController");
const express=require("express");
const router=express.Router();


router.post("/add-product",AddProduct);
router.get("/get-products",GetProducts);
router.get("/get-product/:id",GetProductBasedOnId);
router.delete("/delete-product/:id",DeleteProduct);
router.put("/update-product/:id",UpdateProduct);
router.get("/product-price",FilterProductsOnPrice);
router.get("/products",FilterProductsOnRatings);

module.exports=router;