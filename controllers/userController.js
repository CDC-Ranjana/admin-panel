const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/newAdminModel');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const addNewAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);


  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  const adminExists = await User.findOne({ isAdmin: true });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin account already exists. Please log in to your account.' });
  }

  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, isAdmin: true });
    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register admin', error });
  }
};

const editNewAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  if (password && password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const admin = await User.findById(id);

    if (!admin || !admin.isAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.username = username;
    admin.email = email;

    if (password) {
      // Hash the new password before saving
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
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

module.exports = { addNewAdmin, loginUser, deleteNewAdmin, editNewAdmin }