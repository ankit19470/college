const Department = require("./departmentModel")
Add = (req, res) => {
    var validationerror = []
    if (!req.body.departmentName)
        validationerror.push("Department is required")
    if (validationerror.length > 0) {
        res.send({
            status: 402,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        // insertion
        Department.findOne({ departmentName: req.body.departmentName })

            .then(departmentData => {
                if (!departmentData) {
                    let departObj = new Department
                    departObj.departmentName = req.body.departmentName
                    departObj.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Added is successfully",
                                data: saveRes
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
                else {
                    // duplycacy
                    res.send({
                        status: 422,
                        success: false,
                        message: "Record is alredy exists",
                        data: departmentData
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
getall = (req, res) => {
    Department.find()
        .then(departmentData => {
            res.send({
                status: 200,
                success: true,
                message: "Data Loaded",
                data: departmentData
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
getSingle = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        Department.findOne({ _id: req.body._id })
            .then(departmentData => {
                res.send({
                    status: 200,
                    success: true,
                    message: "Data Loaded",
                    data: departmentData
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
}
deleteData = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        // delete

        Department.deleteOne({ _id: req.body._id })
            .then(departmentData => {
                res.send({
                    status: 200,
                    success: true,
                    message: "Department deleted",
                    data: departmentData
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
}
updateData = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        //update
        Department.findOne({ _id: req.body._id })
            .then(departmentData => {
                if (!departmentData) {
                    res.send({
                        status: 404,
                        success: "false",
                        message: "Data not found",

                    })
                }
                else {
                    if (req.body.departmentName)
                        departmentData.departmentName = req.body.departmentName
                    departmentData.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Record is updated",
                                data: saveRes
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
    Add, getall, getSingle, deleteData, updateData
}