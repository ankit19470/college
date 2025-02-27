const mongoose=require("mongoose")
const applicationSchema=mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:"students",default:null},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:"jobposts",default:null},
    Resume:{type:String,default:'no_image.jpg'},
    status:{type:String,default:"Pending"}, //Short-Listed, Rejected, Interviewed, Placed
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("applications",applicationSchema)