const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',default:null},
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
     departmentId: { type: mongoose.Schema.Types.ObjectId,ref:"departments", default: null },
     courseId: { type: mongoose.Schema.Types.ObjectId,ref:"courses", default: null },
    contact: { type: Number, default: null },
    address: { type: String, default: null },
    profile: { type: String, default: 'no_image.jpg' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },

})
module.exports = new mongoose.model("students", studentSchema)