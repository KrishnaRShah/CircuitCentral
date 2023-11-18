import mongoose from 'mongoose';

const storeOwnerSchema = new mongoose.Schema({
  unique_id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    maxlength: 100
  },
  username: {
    type: String,
    maxlength: 200
  },
  email: {
    type: String,
    maxlength: 100
  },
  name: {
    type: String,
    maxlength: 100
  }
});

const StoreOwner = mongoose.model('StoreOwner', storeOwnerSchema);
export default StoreOwner;
