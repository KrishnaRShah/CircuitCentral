import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  store_number: {
    type: String,
    required: true,
    unique: true
  },
  store_owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'StoreOwner'
  },
  location: {
    type: String,
    maxlength: 200
  },
  shipping_company: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ShippingCompany'
  }
});

const Store = mongoose.model('Store', storeSchema);
export default Store;
