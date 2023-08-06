const express = require('express');
const app = express();
const mongoose = require('mongoose');
const roleRouter = require("./Routes/Role-routes");
const userRouter = require("./Routes/User-routes");
const cors = require("cors");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(roleRouter)
app.use('/user',userRouter)

mongoose.connect("mongodb://127.0.0.1:27017/projectmanager",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
     console.log('database connected');
}).catch((err)=>{
    console.log(err);
})



const port = 3000
app.listen(port,()=>{
    console.log("Server running on port ",port);
})