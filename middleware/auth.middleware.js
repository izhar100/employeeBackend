const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
       try {
        const decoded=jwt.verify(token,process.env.secretKey)
        if(decoded){
            next()
        }else{
            res.status(400).json({error:"Token not recognized"})
        }
       } catch (error) {
        res.status(400).json({error:error.message})
       }
    }else{
        res.status(400).json({message:"Please login first"})
    }
}

module.exports={
    auth
}