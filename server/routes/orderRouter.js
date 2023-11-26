import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
  getItems,
  addItem,
  deleteItem,
} from "../controllers/orderController.js";

const router = express.Router();
router
  .get("/all", getOrders)
  .get("/:id", getOrder)
  .get("/:id/items", getItems)
  .post("/", createOrder)
  .post("/:id/items", addItem)
  .put("/:id", updateOrder)
  .put("/:id/status", changeOrderStatus)
  .delete("/:id", deleteOrder)
  .delete("/:id/items", deleteItem);

export default router;
