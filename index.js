const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const cloudinary = require("cloudinary").v2;
const ItemRouter = require('./routes/ItemRoutes')
require('dotenv').config()

app.use(express.json())
app.use(cors())



mongoose.connect(process.env.MONGODB_URL,{
 
})

app.use('/api/Items', ItemRouter)

app.listen(3001,()=>{
    console.log('Server Running on Port 3001')
})