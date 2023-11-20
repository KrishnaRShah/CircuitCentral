import Customer from '../models/customerModel.js';
import mongoose from 'mongoose';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createCustomer = async (req, res) => {
  const customer = req.body;
  const newCustomer = new Customer(customer);
  try {
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, shipping_address, password } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No customer with id: ${id}`);
  const updatedCustomer = { name, email, shipping_address, password, _id: id };
  await Customer.findByIdAndUpdate(id, updatedCustomer, { new: true });
  res.json(updatedCustomer);
}

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No customer with id: ${id}`);
  await Customer.findByIdAndRemove(id);
  res.json({ message: "Customer deleted successfully." });
}

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email, password });
    if (!customer) return res.status(404).json({ message: "Invalid login credentials." });
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
