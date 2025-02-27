const Application = require("./applicationModel")
const Student=require("../student/studentModel")
appAdd = (req, res) => {
    var validationerror = []
    if (!req.body.studentId)
        validationerror.push("Student Id is requried")
    if (!req.body.jobId)
        validationerror.push("job Id is requried")
    if (!req.body.Resume)
        validationerror.push("Resume is requried")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "Validaiton error",
            error: validationerror
        })
    }
    else { 
        Application.findOne({
            studentId:req.body.studentId,
            jobId:req.body.jobId
        })
        .then((appData)=>{
            if(!appData){
         let appobj = new Application()
                appobj.studentId = req.body.studentId
                appobj.jobId = req.body.jobId
                appobj.Resume ="applicationimages/"+ req.body.Resume
                appobj.save()
                    .then(saveRes => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "Application form inserted",
                            data: saveRes
                        })
                    })
                    .catch(err => {
                        res.send({
                            status: 500,
                            success: false,
                            message: "Inetrnal server error",
                            error: err.message
                        })
                     })
            }else{
                res.send({
                    status: 422,
                    success: false,
                    message: "Record is alredy exists",
                    data: appData
                })
            }

        })
        .catch(err => {
            res.send({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
       
    }
}
appgetdata = (req, res) => {
   Application.find(req.body)
   .populate("studentId")
   .populate("jobId")
        .then(applicationData => {
            res.send({
                status: 200,
                success: true,
                message: "Data Loaded",
                data: applicationData
            })
        })
        .catch(err => {
            res.send({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
}
appgetsingle= (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 402,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        Application.findOne({ _id: req.body._id })
        .populate("studentId")
        .populate("jobId")
            .then(applicationData => {
                if (!applicationData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Data not Found",
                        data: applicationData
                    })
                }
                else {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Data is found",
                        data: applicationData
                    })
                }
            })
            .catch(err => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                })
            })
    }
}
changeStatus = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (!req.body.status)
        validationerror.push("status is required")
    if (validationerror.length > 0) {
        res.send({
            status: 402,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        Application.findOne({ _id: req.body._id })
            .then(applicationData => {
                if (!applicationData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Data not Found",
                        data: applicationData
                    })
                }
                else {
                    applicationData.status=req.body.status
                    applicationData.save()
                        .then(() => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Updated successfully",
                                data: applicationData
                            })
                        })
                }
            })
            .catch(err => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                })
            })
    }
}
module.exports = {
    appAdd,appgetdata,appgetsingle,changeStatus
}