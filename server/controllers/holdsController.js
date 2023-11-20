import Holds from '../models/holdsModel.js';
import mongoose from 'mongoose';

export const getHolds = async (req, res) => {
  try {
    const holds = await Holds.find();
    res.status(200).json(holds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getHold = async (req, res) => {
  const { id } = req.params;
  try {
    const hold = await Holds.findById(id);
    res.status(200).json(hold);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createHold = async (req, res) => {
  const hold = req.body;
  const newHold = new Holds(hold);
  try {
    await newHold.save();
    res.status(201).json(newHold);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateHold = async (req, res) => {
  const { id } = req.params;
  const { item_number, store_number } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hold with id: ${id}`);
  const updatedHold = { item_number, store_number, _id: id };
  await Holds.findByIdAndUpdate(id, updatedHold, { new: true });
  res.json(updatedHold);
}

export const deleteHold = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hold with id: ${id}`);
  await Holds.findByIdAndRemove(id);
  res.json({ message: "Hold deleted successfully." });
}

export const getHoldByItemNumber = async (req, res) => {
  const item_number = req.query.item_number;
  try {
    const holds = await Holds.find({
      item_number: item_number
    })
    res.status(200).json(holds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getHoldByStoreNumber = async (req, res) => {
  const store_number = req.query.store_number;
  try {
    const holds = await Holds.find({
      store_number: store_number
    })
    res.status(200).json(holds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
