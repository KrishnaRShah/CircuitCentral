import e from 'cors';
import Warranty from '../models/warrantyModel.js';
import mongoose from 'mongoose';

export const getWarranties = async (req, res) => {
  try {
    const warranties = await Warranty.find();
    res.status(200).json(warranties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getWarranty = async (req, res) => {
  const { id } = req.params;
  try {
    const warranty = await Warranty.findById(id);
    res.status(200).json(warranty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getWarrantiesByCustomer = async (req, res) => {
  const { customer_id } = req.params;
  try {
    const warranty = await Warranty.find({ customer_id });
    res.status(200).json(warranty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createWarranty = async (req, res) => {
  const warranty = req.body;
  const newWarranty = new Warranty(warranty);
  try {
    await newWarranty.save();
    res.status(201).json(newWarranty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateWarranty = async (req, res) => {
  const { id } = req.params;
  const { warranty_id, activation_date } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No warranty with id: ${id}`);
  const updatedWarranty = { warranty_id, activation_date, _id: id };
  await Warranty.findByIdAndUpdate(id, updatedWarranty, { new: true });
  res.json(updatedWarranty);
}

export const deleteWarranty = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No warranty with id: ${id}`);
  await Warranty.findByIdAndRemove(id);
  res.json({ message: "Warranty deleted successfully." });
}

export const getWarrantyByItem = async (req, res) => {
  const { item_num } = req.params;
  try {
    const warranty = await Warranty.findOne({ item_num: item_num });
    res.status(200).json(warranty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getWarrantyByItemAndCustomer = async (req, res) => {
  const { item_num, customer_id } = req.params;
  try {
    const warranty = await Warranty.findOne({ item_num: item_num, customer_id: customer_id });
    res.status(200).json(warranty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
