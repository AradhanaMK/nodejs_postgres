const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  productCode: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = model('Product', productSchema);

module.exports = Product;

