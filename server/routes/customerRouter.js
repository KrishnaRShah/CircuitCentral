import express from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
  registerCustomer,
  getCustomerOrders,
  addOrderToCustomer,
  deleteOrderFromCustomer,
} from "../controllers/customerController.js";

const router = express.Router();
router
  .get("/all", getCustomers)
  .get("/login", loginCustomer)
  .get("/register", registerCustomer)
  .get("/:id", getCustomer)
  .get("/:id/orders", getCustomerOrders)
  .post("/", createCustomer)
  .post("/orders", addOrderToCustomer)
  .put("/:id", updateCustomer)
  .delete("/orders/:id", deleteOrderFromCustomer)
  .delete("/:id", deleteCustomer);

export default router;
