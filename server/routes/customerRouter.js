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
router.get("/all", getCustomers)
  .get("/:id", getCustomer)
  .post("/", createCustomer)
  .put("/:id", updateCustomer)
  .delete("/:id", deleteCustomer)
  .get("/login", loginCustomer)
  .get("/register", registerCustomer)
  .get("/orders", getCustomerOrders)
  .post("/orders", addOrderToCustomer)
  .delete("/orders/:id", deleteOrderFromCustomer);

export default router;
