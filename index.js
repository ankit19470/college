const express=require("express")
const app=express()
const port=1000
const db=require("./config/db")
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'50mb'}))
app.use(express.static(__dirname+"/public"))

const cors=require("cors")
app.use(cors())

const apiRoutes=require("./routes/apiRoutes")
app.use("/api",apiRoutes)
const seeder = require("./config/seeder")
seeder.adminRegister()


app.get("/home",(req,res)=>{
    res.send({
     status:true,
     message:"Home loaded",

    })
})
  app.get("/",(req,res)=>{
        res.send({
            status:false,
            message:"default loaded"
        }) 
    })
app.listen(port,()=>{
    console.log("Server is running"+ port)
})