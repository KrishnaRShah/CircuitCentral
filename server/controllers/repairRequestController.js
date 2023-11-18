import RepairRequest from '../models/repairRequestModel.js';
import mongoose from 'mongoose';

export const getRepairRequests = async (req, res) => {
  try {
    const repairRequests = await RepairRequest.find();
    res.status(200).json(repairRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getRepairRequest = async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findById(req.params.id);
    res.status(200).json(repairRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createRepairRequest = async (req, res) => {
  const repairRequest = req.body;
  const newRepairRequest = new RepairRequest(repairRequest);
  try {
    await newRepairRequest.save();
    res.status(201).json(newRepairRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateRepairRequest = async (req, res) => {
  const { id } = req.params;
  const { repair_request_id, status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No repair request with id: ${id}`);
  const updatedRepairRequest = { repair_request_id, status, _id: id };
  await RepairRequest.findByIdAndUpdate(id, updatedRepairRequest, { new: true });
  res.json(updatedRepairRequest);
}

export const deleteRepairRequest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No repair request with id: ${id}`);
  await RepairRequest.findByIdAndRemove(id);
  res.json({ message: "Repair request deleted successfully." });
}

export const getRepairRequestByStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const repairRequests = await RepairRequest.find({ status });
    res.status(200).json(repairRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getRepairRequestByCustomer = async (req, res) => {
  const { customer_id } = req.params;
  try {
    const repairRequests = await RepairRequest.find({ customer_id });
    res.status(200).json(repairRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getRepairRequestByItem = async (req, res) => {
  const { item_id } = req.params;
  try {
    const repairRequests = await RepairRequest.find({ item_id });
    res.status(200).json(repairRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}