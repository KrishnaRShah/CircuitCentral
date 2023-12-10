import express from "express";
import {
  getHolds,
  getHold,
  createHold,
  updateHold,
  deleteHold,
  getHoldByItemNumber,
  getHoldByStoreNumber,
  getHoldByItemAndStoreNumber
} from "../controllers/holdsController.js";

const router = express.Router();
router
  .get("/all", getHolds)
  .get("/item/:item_number", getHoldByItemNumber)
  .get("/store/:store_number", getHoldByStoreNumber)
  .get("/item/:item_number/store/:store_number", getHoldByItemAndStoreNumber)
  .get("/:id", getHold)
  .post("/", createHold)
  .put("/:id", updateHold)
  .delete("/:id", deleteHold);

export default router;