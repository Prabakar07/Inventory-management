const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Route to get all products (GET /api/products/allproducts)
router.get('/allproducts', getAllProducts);

// Route to get a specific product by ID (GET /api/products/:productId)
router.get('/:productId', getProductById);

// Route to create a new product (POST /api/products/createproduct)
router.post('/createproduct', createProduct);

// Route to update a specific product by ID (PUT /api/products/updateproduct/:productId)
router.put('/updateproduct/:productId', updateProduct);

// Route to delete a specific product by ID (DELETE /api/products/deleteproduct/:productId)
router.delete('/deleteproduct/:productId', deleteProduct);

module.exports = router;
