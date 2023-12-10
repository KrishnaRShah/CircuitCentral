import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  item_number: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item',
    required: true
  },
  store_number: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store',
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;