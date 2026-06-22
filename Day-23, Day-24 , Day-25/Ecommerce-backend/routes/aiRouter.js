const express=require("express");

const router=express.Router();

const givePrompt=require("../controller/aiController")


router.post("/send-prompt",givePrompt);


module.exports=router;