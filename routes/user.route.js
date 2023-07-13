const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModel } = require("../models/user.model");
const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const userExists=await userModel.findOne({email:email})
        if(userExists){
            res.status(400).json({message:"user already exists Please user different email"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=>{
                // Store hash in your password DB.
                if(err){
                   res.status(400).json({err:err})
                }else{
                   const user=new userModel({email,password:hash})
                   await user.save()
                   res.status(200).json({message:"Account created successfully",user:req.body})
                }
            });
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                // result == true
                if(result){
                   const token=jwt.sign({project:"masai employee"},process.env.secretKey)
                   res.status(200).json({message:"Login Success",token:token})
                }else{
                    res.status(400).json({err:err})
                }
            });
        }else{
            res.status(400).json({message:"user not found"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports={
    userRouter
}