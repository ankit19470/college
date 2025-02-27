const Student = require("./studentModel")
const User = require("../user/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltround = 10
const privateKey = "ghegfge74837"
stuAdd = (req, res) => {
    var validationerror = []
    if (!req.body.name)
        validationerror.push("name is required")
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.password)
        validationerror.push("password is required")
    if (!req.body.departmentId)
        validationerror.push(" department Id is required")
    if (!req.body.courseId)
        validationerror.push("course Id is required")
    if (!req.body.contact)
        validationerror.push("contact is required")
    if (!req.body.address)
        validationerror.push("address is required")
    if (!req.body.profile)
        validationerror.push("profile is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        User.findOne({ email: req.body.email })
            .then(studentloginData => {
                console.log(studentloginData);
                if (!studentloginData) {
                    let loginObj = new User()
                    loginObj.name = req.body.name
                    loginObj.email = req.body.email
                    loginObj.userType = 2
                    loginObj.password = bcrypt.hashSync(req.body.password, saltround)
                    loginObj.save()
                        .then(saveRes => {
                            let studentObj = new Student()
                            studentObj.userId = saveRes._id
                            studentObj.name = req.body.name
                            studentObj.email = req.body.email
                            studentObj.password = bcrypt.hashSync(req.body.password, saltround)
                            studentObj.departmentId = req.body.departmentId
                            studentObj.courseId = req.body.courseId
                            studentObj.contact = req.body.contact
                            studentObj.address = req.body.address
                            studentObj.profile = "studentimages/" + req.body.profile
                            studentObj.save()
                                .then(studentSave => {
                                    loginObj.studentId = studentSave._id
                                    loginObj.save()
                                        .then((studentDataObj) => {
                                            res.send({
                                                status: 200,
                                                success: true,
                                                message: "student register",
                                                data: studentSave
                                            })
                                        }).catch((err) => {
                                            res.send({
                                                status: 500,
                                                success: false,
                                                message: "Internal server error",
                                                error: err.message

                                            })
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
                        })
                }
                else {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Student is already exists",
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
stulogin = (req, res) => {
    var validationerror = []
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.password)
        validationerror.push("password is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validtion error",
            error: validationerror
        })
    }
    else {
        User.findOne({ email: req.body.email })
            .then(studentloginData => {
                if (!studentloginData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Invalid Email"
                    })
                }
                else {
                    bcrypt.compare(req.body.password, studentloginData.password, function (err, data) {
                        if (!data) {
                            res.send({
                                status: 420,
                                success: false,
                                message: "Invalid Password"
                            })
                        }
                        else {
                            var tokenObj = {
                                _id: studentloginData._id,
                                name: studentloginData.name,
                                email: studentloginData.email,
                                userType: studentloginData.userType
                            }
                            var token = jwt.sign(tokenObj, privateKey)
                            res.send({
                                status: 200,
                                success: true,
                                message: "Login successfully",
                                token: token,
                                data: studentloginData
                            })
                        }
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
getAll = (req, res) => {
    Student.find()
        .populate("departmentId")
        .populate("courseId")
        .then(studentData => {
            res.send({
                status: 200,
                success: true,
                message: "All Data Found",
                data: studentData
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
singleGet = (req, res) => {
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
        Student.findOne({ _id: req.body._id })
            .populate("departmentId")
            .populate("courseId")
            .then(studentData => {
                res.send({
                    status: 200,
                    success: true,
                    message: "Data is found",
                    data: studentData
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
dataDelete = (req, res) => {
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
        Student.findOne({ _id: req.body._id })
            .then(studentData => {
                if (!studentData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "data not found",
                        data: studentData
                    })
                }
                else {
                    // Student.deleteOne({ _id: req.body._id })
                    if (req.body.status) {
                        studentData.status = req.body.status
                    }
                    studentData.save()
                        .then(() => {
                            User.findOne({ _id: studentData.userId })
                            .then((UserData) => {
                                if (!!UserData) {
                                    UserData.status = req.body.status
                                    UserData.save()
                                        .then((result) => {
                                            res.send({
                                                status: 200,
                                                success: true,
                                                message: "Status updated successfully",
                                                data: studentData
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
                                } else {
                                    studentData.status = !req.body.status
                                    studentData.save()
                                    .then(studentsData => {
                                        res.send({
                                            status: 200,
                                            success: false,
                                            message: "User  not found",

                                        })
                                    }).catch(err => {
                                        res.send({
                                            status: 500,
                                            success: false,
                                            message: "Internal server error",
                                            error: err.message
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
dataUpdate = (req, res) => {
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
        Student.findOne({ _id: req.body._id })
            .then(studentData => {
                if (!studentData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Data not found",
                    })
                }
                else {
                    // if (req.body.name)
                    //     studentData.name = req.body.name
                    // if (req.body.email)
                    //     studentData.email = req.body.email
                    if (req.body.contact)
                        studentData.contact = req.body.contact
                    // if (req.body.departmentId)
                    //     studentData.departmentId = req.body.departmentId
                    // if (req.body.courseId)
                    //     studentData.courseId = req.body.courseId
                    if (req.body.address)
                        studentData.address = req.body.address
                    if (req.body.profile)
                        studentData.profile = "studentimages/" + req.body.profile
                    studentData.save()
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
    stuAdd, stulogin, getAll, singleGet, dataDelete, dataUpdate
}