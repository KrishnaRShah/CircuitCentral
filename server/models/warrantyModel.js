const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  item_num: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item',
    required: true
  },
  warranty_id: {
    type: String,
    required: true,
    unique: true
  },
  activation_date: {
    type: Date,
    required: true
  },
  length: {
    type: String,
    required: true,
    maxlength: 100
  }
});

const Warranty = mongoose.model('Warranty', warrantySchema);
module.exports = Warranty;
