import mongoose from 'mongoose';

const holdsSchema = new mongoose.Schema({
  item_number: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item',
    required: true
  },
  store_number: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store',
    required: true
  }
});

const Holds = mongoose.model('Holds', holdsSchema);
export default Holds;
