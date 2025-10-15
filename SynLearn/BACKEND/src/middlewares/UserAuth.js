const jwt =require("jsonwebtoken")
const UserAuth=async (req,res,next)=>{
    try{
    const {token}=req.cookies
    // console.log("from userauth   "+token)
    const decode=await jwt.verify(token,process.env.Jwt_secret)
    if(!decode)
        res.status(400).send("Not verifed pls login")
     req.decode=decode
    //  console.log(req.decode)
    next();
}
    catch(err){res.status(400).send("Error: "+err.message+" please try agian.." )}

}



module.exports=UserAuth