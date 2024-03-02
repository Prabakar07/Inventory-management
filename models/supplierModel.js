const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  contactPerson: {
    type: String,
    required: true,
  },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;