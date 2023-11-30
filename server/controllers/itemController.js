import Item from '../models/itemModel.js';
import mongoose from 'mongoose';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { item_number, item_price, item_description, item_name, type, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);
  const updatedItem = { item_number, item_price, item_description, item_name, type, quantity, _id: id };
  await Item.findByIdAndUpdate(id, updatedItem, { new: true });
  res.json(updatedItem);
}

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);
  await Item.findByIdAndRemove(id);
  res.json({ message: "Item deleted successfully." });
}

export const getItemByDescription = async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const items = await Item.find({
      item_description: { $regex: keyword, $options: 'i' },
      OrderNumber: null
    })
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getItemByType = async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const items = await Item.find({
      type: { $regex: keyword, $options: 'i' },
      OrderNumber: null
    })

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getItemByName = async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const items = await Item.find({
      item_name: { $regex: keyword, $options: 'i' },
    })

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



