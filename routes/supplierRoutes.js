const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');

// Route to get all suppliers (GET /api/suppliers/allsuppliers)
router.get('/allsuppliers', getAllSuppliers);

// Route to get a specific supplier by ID (GET /api/suppliers/:supplierId)
router.get('/:supplierId', getSupplierById);

// Route to create a new supplier (POST /api/suppliers/createsupplier)
router.post('/createsupplier', createSupplier);

// Route to update a specific supplier by ID (PUT /api/suppliers/updatesupplier/:supplierId)
router.put('/updatesupplier/:supplierId', updateSupplier);

// Route to delete a specific supplier by ID (DELETE /api/suppliers/deletesupplier/:supplierId)
router.delete('/deletesupplier/:supplierId', deleteSupplier);

module.exports = router;
