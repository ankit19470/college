const mongoose=require("mongoose")
const contactSchema=new mongoose.Schema({
    firstName:{type:String,default:null},
    lastName:{type:String,default:null},
    email:{type:String,default:null},
    address:{type:String,default:null},
    contact:{type:Number,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("contacts",contactSchema)