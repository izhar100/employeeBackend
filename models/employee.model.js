const mongoose=require("mongoose")
const employSchema=mongoose.Schema({
     first_name:{type:String,required:true},
     last_name:{type:String,required:true},
     email:{type:String,required:true},
     department:{type:String,required:true},
     salary:{type:Number,required:true}
},{
    versionKey:false
})

const employModel=mongoose.model("employee",employSchema)
module.exports={
    employModel
}