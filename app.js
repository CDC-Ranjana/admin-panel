require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoute');
const connectDB = require('./config/db');
const User = require('./models/newAdminModel');
const bcrypt = require("bcryptjs")
const cors = require("cors")



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))




// Routes
// console.log("Hello before");

app.use('/api/users', userRoutes);
// console.log("Hello after");
app.use('/api/blogs', blogRoutes);


const createInitialAdmin = async () => {
  try {
 
    const username = 'Test'; // Set default username
    const email = 'test@example.com'; // Set default email
    const password = 'test@123'; // Set default password

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: true
    });

    await newAdmin.save();
    console.log('Initial admin user created successfully');
  } catch (error) {
    console.error('Failed to create initial admin user:', error);
  }
};

// createInitialAdmin()

app.get("/" , (req,res) => res.send("Working fine"))

app.listen(PORT, console.log(`Server running on port ${PORT}`));
connectDB()