import express from "express";
import {
  getWarranties,
  getWarranty,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  getWarrantyByItem,
  getWarrantyByItemAndCustomer,
} from "../controllers/warrantyController.js";

const router = express.Router();
router
  .get("/all", getWarranties)
  .get("/:id", getWarranty)
  .get("/item_number/:item_num/customer/:customer_id", getWarrantyByItemAndCustomer)
  .get("/item_number", getWarrantyByItem)
  .post("/", createWarranty)
  .put("/:id", updateWarranty)
  .delete("/:id", deleteWarranty);

export default router;