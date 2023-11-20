import Order from '../models/orderModel.js';
import mongoose from 'mongoose';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createOrder = async (req, res) => {
  const order = req.body;
  const newOrder = new Order(order);
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer_id, customer_address, shipping_company, status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);
  const updatedOrder = { customer_id, customer_address, shipping_company, status, _id: id };
  await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
  res.json(updatedOrder);
}

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);
  await Order.findByIdAndRemove(id);
  res.json({ message: "Order deleted successfully." });
}

export const changeOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);
  const updatedOrder = { status, _id: id };
  await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
  res.json(updatedOrder);
}

export const getItems = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order.items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const addItem = async (req, res) => {
  const { id } = req.params;
  const { item } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);
  const order = await Order.findById(id);
  order.items.push(item);
  await Order.findByIdAndUpdate(id, order, { new: true });
  res.json(order);
}

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const { item } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);
  const order = await Order.findById(id);
  order.items = order.items.filter((i) => i !== item);
  await Order.findByIdAndUpdate(id, order, { new: true });
  res.json(order);
}
