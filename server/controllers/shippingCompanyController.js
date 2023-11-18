import ShippingCompany from '../models/shippingCompanyModel.js';
import mongoose from 'mongoose';

export const getShippingCompanies = async (req, res) => {
  try {
    const shippingCompanies = await ShippingCompany.find();
    res.status(200).json(shippingCompanies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getShippingCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const shippingCompany = await ShippingCompany.findById(id);
    res.status(200).json(shippingCompany);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createShippingCompany = async (req, res) => {
  const shippingCompany = req.body;
  const newShippingCompany = new ShippingCompany(shippingCompany);
  try {
    await newShippingCompany.save();
    res.status(201).json(newShippingCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateShippingCompany = async (req, res) => {
  const { id } = req.params;
  const { company_id, name } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No shippingCompany with id: ${id}`);
  const updatedShippingCompany = { company_id, name, _id: id };
  await ShippingCompany.findByIdAndUpdate(id, updatedShippingCompany, { new: true });
  res.json(updatedShippingCompany);
}

export const deleteShippingCompany = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No shippingCompany with id: ${id}`);
  await ShippingCompany.findByIdAndRemove(id);
  res.json({ message: "ShippingCompany deleted successfully." });
}

