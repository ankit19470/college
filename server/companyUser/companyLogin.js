const mongoose=require("mongoose")
const companyLoginSchema=mongoose.Schema({
         name:{type:String,default:null},
         email:{type:String,default:null},
         password:{type:String,default:null},
         userType:{type:Number,default:2}, 
         status:{type:Boolean,default:true},
         address:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("logins",companyLoginSchema)