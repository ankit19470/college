const mongoose=require("mongoose")
const courseSchema=mongoose.Schema({
    deptId:{type:mongoose.Schema.Types.ObjectId,ref:"departments",default:null},
    courseName:{type:String,default:null},
    courseCode:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("courses",courseSchema)