const express=require("express");
const router=express.Router();

const {AddCartProducts,GetCartProducts,removeCart,ClearCartProducts} =require("../controller/cartController");

router.post("/add-cart",AddCartProducts);
router.get("/cart-products",GetCartProducts);
router.delete("/remove-product",removeCart); 
router.delete("/clear",ClearCartProducts)
module.exports=router;