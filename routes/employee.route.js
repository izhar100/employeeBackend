const express=require('express')
const { employModel } = require('../models/employee.model')
const { auth } = require('../middleware/auth.middleware')
const employeeRouter=express.Router()
employeeRouter.use(auth)
employeeRouter.get("/", async (req, res) => {
    try {
      const { search, department, sort, page = 1, limit = 5 } = req.query;
  
      let query = {};
  
      if (search) {
        query.$or=[
         {first_name: {$regex:search,$options:"i"}},
         {last_name: {$regex:search,$options:"i"}}
        ]
      }
  
      if (department) {
        query.department = department;
      }
  
      const count = await employModel.countDocuments(query);
      const totalPages = Math.ceil(count / limit);
  
      const employees = await employModel
        .find(query)
        .sort({ salary: sort === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      if (employees.length > 0) {
        res.status(200).json({
          employees: employees,
          totalPages: totalPages,
          currentPage: parseInt(page),
        });
      } else {
        res.status(200).json({ message: "No employees found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
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