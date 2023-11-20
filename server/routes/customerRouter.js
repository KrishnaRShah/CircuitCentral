import express from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
} from "../controllers/customerController.js";

const router = express.Router();
router
  .get("/all", getCustomers)
  .get("/login", loginCustomer)
  .get("/:id", getCustomer)
  .post("/", createCustomer)
  .put("/:id", updateCustomer)
  .delete("/:id", deleteCustomer);

export default router;
