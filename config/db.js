
const mongoose = require('mongoose');

// Database connection
const connectDB  = async ()=>{
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
    
  } catch (error) {
    console.log("Something went wrong while connecting to database ");
    
  }
}


module.exports = connectDB