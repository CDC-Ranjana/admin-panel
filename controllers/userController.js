const bcrypt = require('bcryptjs');
const User = require("../models/newAdminModel")


const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Return the users as a JSON response
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    // Handle errors and send a 500 response
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


const addNewAdmin = async (req, res) => {

  
  const { username, email, password, phone, isAdmin } = req.body;
  console.log(req);

  try {
    // Check if admin with the same email already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }

    // Create new admin
    const newAdmin = new User({
      username,
      email,
      password,
      phone,
      isAdmin,
    });

    // Save the admin to the database
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editNewAdmin = async (req, res) => {
  const { id } = req.params;

  // Destructure the request body to extract all relevant fields
  const { username, email, phone, isAdmin } = req.body;

  // Ensure required fields are present
  if (!username || !email || !phone) {
    return res.status(400).json({ message: 'Username, email, and phone are required' });
  }


  try {
    // Find the admin by ID
    const admin = await User.findById(id);
    console.log("Admin found: ", admin);

    // Check if the admin exists and is an admin
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the fields if they are provided in the request body
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (typeof isAdmin !== 'undefined') admin.isAdmin = isAdmin;

    // If a new password is provided, hash it before saving
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   admin.password = await bcrypt.hash(password, salt);
    // }

    // Save the updated admin to the database
    await admin.save();

    // Respond with success message and updated admin data
    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    // Handle any errors that occur
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Failed to update admin', error });
  }
};


const deleteNewAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await User.findById(id);

    if (!admin || !admin.isAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await admin.deleteOne();
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete admin', error });
  }
};




// super admin login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    // console.log("user" , user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials or admin not registered' });
    }
    // const usersss = 
    const isMatched = user.matchPassword(req.body.password)
    console.log("isMatched", isMatched);

    if (!isMatched) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return admin user data
    res.status(200).json({
      message: 'Admin login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to login admin', error });
  }
}

module.exports = { addNewAdmin, loginUser, deleteNewAdmin, editNewAdmin, getAllUsers }