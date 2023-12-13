import mongoose from 'mongoose';

const warrantySchema = new mongoose.Schema({
  item_num: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item',
    required: true
  },
  store_number:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store',
    required: true
  },
  customer_id:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
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
    type: Number,
    required: true
  }
});

const Warranty = mongoose.model('Warranty', warrantySchema);
export default Warranty;
