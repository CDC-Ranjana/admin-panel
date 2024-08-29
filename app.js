require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoute');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);


app.listen(PORT, console.log(`Server running on port ${PORT}`));
connectDB()