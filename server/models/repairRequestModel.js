import mongoose from 'mongoose';

const repairRequestSchema = new mongoose.Schema({
  request_id: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    maxlength: 100
  },
  estimated_cost: {
    type: Number
  },
  date: {
    type: Date
  },
  store_number: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store'
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer'
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item'
  },
  warranty_check: {
    type: String,
    maxlength: 100
  }
});

const RepairRequest = mongoose.model('RepairRequest', repairRequestSchema);
export default RepairRequest;
