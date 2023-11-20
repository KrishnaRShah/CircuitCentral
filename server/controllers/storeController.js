import e from 'cors';
import Store from '../models/storeModel.js';
import mongoose from 'mongoose';

export const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findById(id);
    res.status(200).json(store);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createStore = async (req, res) => {
  const store = req.body;
  const newStore = new Store(store);
  try {
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateStore = async (req, res) => {
  const { id } = req.params;
  const { store_owner, location, shipping_company } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No store with id: ${id}`);
  const updatedStore = { store_owner, location, shipping_company, _id: id };
  await Store.findByIdAndUpdate(id, updatedStore, { new: true });
  res.json(updatedStore);
}

export const deleteStore = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No store with id: ${id}`);
  await Store.findByIdAndRemove(id);
  res.json({ message: "Store deleted successfully." });
}

export const getShippingCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findById(id);
    const shipping_company = store.shipping_company;
    res.status(200).json(shipping_company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getStoreOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findById(id);
    const store_owner = store.store_owner;
    res.status(200).json(store_owner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
