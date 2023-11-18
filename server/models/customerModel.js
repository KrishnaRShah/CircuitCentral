import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  unique_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    maxlength: 100
  },
  email: {
    type: String,
    maxlength: 100
  },
  shipping_address: {
    type: String,
    maxlength: 100
  },
  password: {
    type: String,
    maxlength: 100
  }
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
