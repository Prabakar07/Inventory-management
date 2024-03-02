const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register User 
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Customize the logic to handle user registration based on your schema
    const user = await User.create({
      username,
      password: hashedPassword,
      role, // Customize as per your User schema
    });

    let token = null;

    // Check if the user role is 'admin' or 'manager', then generate a JWT token
    if (role === 'admin' || role === 'manager') {
      token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    }

    // Include the token in the response
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Login User 
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter username and password' });
    }

    // Finding the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    // Include the token in the response and store it in local storage
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





//Logout - /api/health/logout
const logoutUser = (req, res) => {
  // Clear the authentication token from client-side storage
  // Here, you might clear it from localStorage, sessionStorage, or wherever it's stored on the client side
  // Example for localStorage: localStorage.removeItem('jwtToken');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
