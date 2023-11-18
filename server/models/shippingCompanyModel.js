const mongoose = require('mongoose');

const shippingCompanySchema = new mongoose.Schema({
  company_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  }
});

const ShippingCompany = mongoose.model('ShippingCompany', shippingCompanySchema);
module.exports = ShippingCompany;
