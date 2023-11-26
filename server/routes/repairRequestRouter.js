import express from "express";
import {
  getRepairRequests,
  getRepairRequest,
  createRepairRequest,
  updateRepairRequest,
  deleteRepairRequest,
  getRepairRequestByStatus,
  getRepairRequestByCustomer,
  getRepairRequestByItem,
  getRepairRequestByStore,
} from "../controllers/repairRequestController.js";

const router = express.Router();
router
  .get("/all", getRepairRequests)
  .get("/:id", getRepairRequest)
  .get("/status/:status", getRepairRequestByStatus)
  .get("/customer/:customer_id", getRepairRequestByCustomer)
  .get("/item/:item_id", getRepairRequestByItem)
  .get("/store/:store_id", getRepairRequestByStore)
  .post("/", createRepairRequest)
  .put("/:id", updateRepairRequest)
  .delete("/:id", deleteRepairRequest);

export default router;
