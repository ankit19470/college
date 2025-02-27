const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    // userId:{type:Number,default:0},
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    userType:{type:Number,default:3}, //1= admin, 2=student 3=company
    studentId:{type: mongoose.Schema.Types.ObjectId,ref:"students", default: null},
    companyId:{type: mongoose.Schema.Types.ObjectId,ref:"companies", default: null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})
module.exports=new mongoose.model("user",userSchema)