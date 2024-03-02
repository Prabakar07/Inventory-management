const Supplier = require('../models/supplierModel');

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate('products');
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.supplierId).populate('products');
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();

    // Populate the products' details in the saved supplier
    await savedSupplier.populate('products')

    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.supplierId,
      req.body,
      { new: true }
    ).populate('products');
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.supplierId);
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
