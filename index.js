const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const cloudinary = require("cloudinary").v2;
const ItemRouter = require('./routes/ItemRoutes')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
app.use('/api/Items', ItemRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})