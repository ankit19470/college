const mongoose=require("mongoose")
const jobSchema=mongoose.Schema({
    Title:{type:String,default:null},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"companies",default:null},
    Description:{type:String,default:null},
    Salary:{type:String,default:null},
    Experience:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("jobposts",jobSchema)