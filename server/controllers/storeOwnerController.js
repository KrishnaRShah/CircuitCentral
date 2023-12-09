import StoreOwner from '../models/storeOwnerModel.js';
import mongoose from 'mongoose';

export const getStoreOwners = async (req, res) => {
  try {
    const storeOwners = await StoreOwner.find();
    res.status(200).json(storeOwners);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getStoreOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const storeOwner = await StoreOwner.findById(id);
    res.status(200).json(storeOwner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
} 

export const createStoreOwner = async (req, res) => {
  const storeOwner = req.body;
  const newStoreOwner = new StoreOwner(storeOwner);
  try {
    await newStoreOwner.save();
    res.status(201).json(newStoreOwner);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateStoreOwner = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No store owner with id: ${id}`);
  const updatedStoreOwner = { name, email, password, _id: id };
  await StoreOwner.findByIdAndUpdate(id, updatedStoreOwner, { new: true });
  res.json(updatedStoreOwner);
}

export const deleteStoreOwner = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No store owner with id: ${id}`);
  await StoreOwner.findByIdAndRemove(id);
  res.json({ message: "Store owner deleted successfully." });
}

export const loginStoreOwner = async (req, res) => {
  const { email, password } = req.query;
  try {
    const owner = await StoreOwner.findOne({ email, password });
    if (!owner) return res.status(404).json({ message: "Invalid login credentials." });
    res.status(200).json(owner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

