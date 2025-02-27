const router=require("express").Router()
const departmentController=require("../server/department/departmentContoller")
const courseController=require("../server/course/courseContoller")
const studentController=require("../server/student/studentController")
const companyController=require("../server/company/companyController")
const jobContoller=require("../server/jobpost/jobController")
const applicationController=require("../server/application/appilcationController")
const adminDashboard=require("../dashboard/adminDashboard")
const userController=require("../server/user/userController")
const contactController=require("../server/contact/contactController")

//require multer
const multer=require("multer")
const { adminDash } = require("../dashboard/adminDashboard")


// studentImage multer
const studentstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/studentimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var newname= file.fieldname + '-' + uniqueSuffix + file.originalname
      req.body["profile"]=newname
      cb(null ,newname)
    }
  })
  // const studentupload = multer({ storage: studentstorage })
  const studentupload = multer({ storage: studentstorage })



// companyImage multer
  const companystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/companyimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var newname= file.fieldname + '-' + uniqueSuffix + file.originalname
      req.body["Logo"]=newname
      cb(null ,newname)
    }
  })
  const companyupload=multer({ storage: companystorage})

// applicationImage multer
const applicationstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./public/applicationimages')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var newname= file.fieldname + '-' + uniqueSuffix + file.originalname
    req.body["Resume"]=newname
    cb(null ,newname)
  }
})
const applicationupload=multer({ storage: applicationstorage})



// router.use(require("../config/middleware"))

// department API
router.post("/add/department",departmentController.Add)
router.post("/getall/department",departmentController.getall)
router.post("/getsingle/department",departmentController.getSingle)
router.post("/delete/department",departmentController.deleteData)
router.post("/update/department",departmentController.updateData)

// course API
router.post("/add/course",courseController.add)
router.post("/getall/course",courseController.getall)
router.post("/getsingle/course",courseController.getsingle)
router.post("/delete/course",courseController.deletedata)
router.post("/update/course",courseController.updatedata)

// student API
router.post("/add/student",studentupload.single('profile'),studentController.stuAdd)
router.post("/login/student",studentController.stulogin)
router.post("/getall/student",studentController.getAll)
router.post("/singleget/student",studentController.singleGet)
router.post("/delete/student",studentController.dataDelete)
router.post("/update/student",studentupload.single('profile'),studentController.dataUpdate)

// company API
router.post("/add/company",companyupload.single('Logo'),companyController.comAdd)
router.post("/login/company",companyController.login)
router.post("/getall/company",companyController.getallCom)
router.post("/getsingle/company",companyController.getsingleCom)
router.post("/delete/company",companyController.deleteDataCom)

router.post("/update/company",companyupload.single('Logo'),companyController.updateDataCom)


// jobPost API
router.post("/add/jobpost",jobContoller.jobadd)
router.post("/getall/jobpost",jobContoller.jobgetall)
router.post("/getsingle/jobpost",jobContoller.jobgetsingle)
router.post("/delete/jobpost",jobContoller.jobgetdelete)
router.post("/update/jobpost",jobContoller.jobupdate)

// Application API
router.post("/add/application",applicationupload.single('Resume'),applicationController.appAdd)
router.post("/getall/application",applicationController.appgetdata)
router.post("/getsingle/application",applicationController.appgetsingle)
router.post("/changeStatus/application",applicationController.changeStatus)

//dashboard
router.post("/admin/dashboard",adminDashboard.adminDash)

//user api
router.post("/changepassword/user",userController.changePassword)

// contact
router.post("/add/contact",contactController.add)
router.post("/getall/contact",contactController.getallCon)

module.exports= router
