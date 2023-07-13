const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { employeeRouter } = require("./routes/employee.route")
const app=express()
app.use(express.json())
app.use(cors())
require('dotenv').config()
app.use("/user",userRouter)
app.use("/employees",employeeRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
        console.log(`server is running at port ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
})
