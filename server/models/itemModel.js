const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_number: {
    type: String,
    required: true,
    unique: true
  },
  item_price: {
    type: Number
  },
  item_description: {
    type: String,
    maxlength: 200
  },
  type: {
    type: String,
    maxlength: 100
  },
  quantity: {
    type: Number
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
