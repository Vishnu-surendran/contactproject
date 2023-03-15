const express=require("express")
const app=express()
require("dotenv").config()
const mongoose=require("mongoose")
const PORT=process.env.PORT || 1005
const cors = require('cors');
const userRoutes=require("./routes/userRoutes")
app.use(cors())

app.use(express.json());

app.use("/api/user",userRoutes)

mongoose.connect(process.env.MONGO_URI).then((res)=>{
    console.log("dbconnected");
    app.listen(PORT,(()=>{
        console.log(`server is listening on ${process.env.PORT}`);
    }))
    }).catch((error)=>{
    console.log(error.message)
    })
    