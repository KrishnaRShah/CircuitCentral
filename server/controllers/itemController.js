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
  const { item_id, name, description, price, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);
  const updatedItem = { item_id, name, description, price, quantity, _id: id };
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
  const { storeNumber, itemNumber, keyword } = req.query;
  try {
    const items = await Item.find({
      item_description: { $regex: keyword, $options: 'i' },
      OrderNumber: null
    })
      .select('item_number item_price item_description type')
      .populate({
        path: 'Holds',
        match: { store_number: storeNumber, item_number: itemNumber },
        select: ''
      })
      .exec();

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



