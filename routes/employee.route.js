const express=require('express')
const { employModel } = require('../models/employee.model')
const { auth } = require('../middleware/auth.middleware')
const employeeRouter=express.Router()
employeeRouter.use(auth)
employeeRouter.get("/",async(req,res)=>{
    try {
        const employee=await employModel.find()
        if(employee.length>0){
            res.status(200).json({employee:employee})
        }else{
            res.status(200).json({message:"No employee found"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }

})
employeeRouter.post("/add",async(req,res)=>{
    try {
        const employee=new employModel(req.body)
        await employee.save()
        res.status(200).json({message:"New employee added",employee:req.body})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
employeeRouter.put("/edit/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const employee=employModel.findOne({_id:id})
        await employModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({message:`${employee.first_name} details updated`})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
employeeRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const employee=employModel.findOne({_id:id})
        await employModel.findByIdAndDelete({_id:id})
        res.status(200).json({message:`${employee.first_name} deleted`})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports={
    employeeRouter
}