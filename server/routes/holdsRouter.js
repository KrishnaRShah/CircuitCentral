import express from "express";
import {
  getHolds,
  getHold,
  createHold,
  updateHold,
  deleteHold,
  getHoldByItemNumber,
  getHoldByStoreNumber,
} from "../controllers/holdsController.js";

const router = express.Router();
router
  .get("/all", getHolds)
  .get("/:id", getHold)
  .get("/item_number", getHoldByItemNumber)
  .get("/store_number", getHoldByStoreNumber)
  .post("/", createHold)
  .put("/:id", updateHold)
  .delete("/:id", deleteHold);

export default router;