const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true
  },
  order_id: {
    type: String,
    required: true,
    unique: true
  },
  customer_address: {
    type: String,
    required: true,
    maxlength: 100
  },
  order_date: {
    type: Date,
    required: true
  },
  shipping_company: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ShippingCompany',
    required: true
  },
  receipt: {
    type: String,
    required: true,
    maxlength: 200
  },
  order_total: {
    type: Number,
    required: true
  },
  items: {
    type: String,
    required: true,
    maxlength: 300
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
