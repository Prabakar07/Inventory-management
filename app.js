const express = require('express');
const inventoryRouter = express.Router();

// Import route modules for different resources
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use separate route files for each resource
inventoryRouter.use('/users', userRoutes);
inventoryRouter.use('/products', productRoutes);
inventoryRouter.use('/suppliers', supplierRoutes);
inventoryRouter.use('/orders', orderRoutes);

module.exports = inventoryRouter;
