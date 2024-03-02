const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.use(authenticateToken);

router.get('/allusers', isAdmin, getAllUsers);
router.get('/:userId', isAdmin, getUserById);
router.put('/updateuser/:userId', isAdmin, updateUser);
router.delete('/deleteuser/:userId', isAdmin, deleteUser);

// Logout route (require authentication)
router.get('/logout', authenticateToken, logoutUser);

module.exports = router;
