const jwt=require("jsonwebtoken")
const privateKey="#$%&Project123#$"
module.exports=(req,res,next)=>{
    var mytoken=req.headers["authorization"]
jwt.verify(mytoken,privateKey,function(err,data){
    if(!data){
        res.send({
            status:403,
            success:false,
            message:"Unauthoticated user"
        })
    }
    else{
        req["decoded"]=data
        next()
    }
})
}