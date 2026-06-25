const mongoose=require("mongoose")

const AISchema=new mongoose.Schema({
    input:{type:String} ,
    output:{type:String}
})

module.exports=mongoose.model('ai_content',AISchema);