const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const FoundItemRouter = require('./routes/FoundItemRoutes')
const AccountRouter = require('./routes/AccountRoutes')
const MatchItemRouter = require('./routes/MatchItemRoutes')
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
app.use('/api/FoundItems', FoundItemRouter)
app.use('/api/Accounts',AccountRouter)
app.use('/api/MatchItems',MatchItemRouter)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})