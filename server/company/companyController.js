// const User = require("../companyUser/companyLogin")
const User = require("../user/userModel")
const Company = require("./companyModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = "#$%&Project123#$"
const saltround = 10
comAdd = (req, res) => {
    var validationerror = []
    if (!req.body.name)
        validationerror.push("name is required")
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.password)
        validationerror.push("password is required")
    if (!req.body.Description)
        validationerror.push("Description is required")
    if (!req.body.Logo)
        validationerror.push("Logo is required")
    if (!req.body.address)
        validationerror.push("Address is required")
    if (!req.body.contact)
        validationerror.push("Contact is required")
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
            .then(companyloginData => {
                if (!companyloginData) {
                    let loginObj = new User()
                    loginObj.name = req.body.name
                    loginObj.email = req.body.email
                    loginObj.userType = 3

                    loginObj.password = bcrypt.hashSync(req.body.password, saltround)
                    loginObj.save()
                        .then(saveRes => {
                            let companyObj = new Company()
                            companyObj.userId = saveRes._id

                            companyObj.name = req.body.name
                            companyObj.email = req.body.email
                            companyObj.password = bcrypt.hashSync(req.body.password, saltround)
                            companyObj.Description = req.body.Description
                            companyObj.Logo = "companyimages/" + req.body.Logo
                            companyObj.address = req.body.address
                            companyObj.contact = req.body.contact

                            companyObj.save()
                                .then(companySave => {
                                    loginObj.companyId = companySave._id
                                    loginObj.save().then((studentDataObj) => {
                                        res.send({
                                            status: 200,
                                            success: true,
                                            message: "Company register",
                                            data: companySave
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
                        status: 200,
                        success: false,
                        message: "company already exist",

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
login = (req, res) => {
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
        // email existence
        User.findOne({ email: req.body.email })
            .then(companyloginData => {
                if (!companyloginData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "invalid email"
                    })
                }
                else {
                    // password compare
                    bcrypt.compare(req.body.password, companyloginData.password, function (err, data) {
                        if (!data) {
                            res.send({
                                status: 420,
                                success: false,
                                message: "invalid password"
                            })
                        }
                        else {
                            var tokenObj = {
                                _id: companyloginData._id,
                                name: companyloginData.name,
                                email: companyloginData.email,
                                userType: companyloginData.userType
                            }
                            var token = jwt.sign(tokenObj, privateKey)
                            res.send({
                                status: 200,
                                success: true,
                                message: "Login successfully",
                                token: token,
                                data: companyloginData
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.send({
                    status: 500,
                    status: false,
                    message: "internal server error",
                    error: err.message
                })
            })
    }
}


getallCom = (req, res) => {
    Company.find()
        .then(companyData => {
            res.send({
                status: 200,
                success: true,
                message: "Data Loaded",
                data: companyData
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
getsingleCom = (req, res) => {
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
        Company.findOne({ _id: req.body._id })
            .then(companyData => {
                if (!companyData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Data not Found",
                        data: companyData
                    })
                }
                else {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Data is found",
                        data: companyData
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
deleteDataCom = (req, res) => {
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
        Company.findOne({ _id: req.body._id })
            .then(companyData => {
                if (!companyData) {
                    res.send({
                        status: 420,
                        success: false,
                        message: "Data not Found",
                        data: companyData
                    })
                }
                else {
                    // Company.deleteOne({ _id: req.body._id })
                    if (req.body.status) {
                        companyData.status = req.body.status

                    }
                    companyData.save()
                        .then(() => {
                            User.findOne({ _id: companyData.userId}).then((sCompanyData) => {
                                if (!!sCompanyData) {
                                    sCompanyData.status = req.body.status
                                    sCompanyData.save()
                                        .then((result) => {
                                            res.send({
                                                status: 200,
                                                success: true,
                                                message: "status updated successfully",
                                                data: companyData
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
                                    companyData.status = !req.body.status
                                    companyData.save()
                                        .then(companysData => {
                                            res.send({
                                                status: 200,
                                                success: false,
                                                message: "User not found"
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
                                        data:err.message
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
updateDataCom = (req, res) => {
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
        Company.findOne({ _id: req.body._id })
            .then(companyData => {
                if (!companyData) {
                    res.send({
                        status: 404,
                        success: "false",
                        message: "Data not found",
                    })
                }
                else {
                    if (req.body.name)
                        companyData.name = req.body.name
                    if (req.body.Email)
                        companyData.Email = req.body.Email
                    if (req.body.Description)
                        companyData.Description = req.body.Description
                    if (req.body.Logo)
                        companyData.Logo = "companyimages/" + req.body.Logo
                    if (req.body.address)
                        companyData.address = req.body.address
                    if (req.body.contact)
                        companyData.contact = req.body.contact
                    companyData.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "record is updated",
                                data: saveRes
                            })
                        })
                }
            })
            .catch(err => {
                res.send({
                    status: 500,
                    success: false,
                    message: "internal server error",
                    error: err.message
                })
            })

    }
}



module.exports = {
    comAdd, login, getallCom, getsingleCom, deleteDataCom, updateDataCom
}