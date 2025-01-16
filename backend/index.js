const bcrypt =require("bcrypt")
const express=require("express")
const cors=require("cors")
const env=require("dotenv").config()
const userRoute=require("./routers/user.router")
const travelRoute=require("./routers/travel.router")
console.log(process.env.hello)
const jwt =require("jsonwebtoken")

const multer = require("multer");
const path = require("path");

const app =express()
app.use(express.json())
app.use(cors())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/assets",express.static(path.join(__dirname,"assets")))

// app.get("hello",async(req,res)=>{
//     return res.status(200).json({message:"hello"})
// })

app.use('/api/user',userRoute)
app.use('/api/travel',travelRoute)

app.listen(8000)
module.exports=app