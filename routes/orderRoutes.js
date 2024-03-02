const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

// Route to get all orders (GET /api/orders/allorders)
router.get('/allorders', getAllOrders);

// Route to get a specific order by ID (GET /api/orders/:orderId)
router.get('/:orderId', getOrderById);

// Route to create a new order (POST /api/orders/createorder)
router.post('/createorder', createOrder);

// Route to update a specific order by ID (PUT /api/orders/updateorder/:orderId)
router.put('/updateorder/:orderId',updateOrder);

// Route to delete a specific order by ID (DELETE /api/orders/deleteorder/:orderId)
router.delete('/deleteorder/:orderId', deleteOrder);

module.exports = router;
