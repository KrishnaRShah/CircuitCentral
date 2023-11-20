import express from "express";

import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemByDescription,
  getItemByType,
  getItemByName
} from "../controllers/itemController.js";

const router = express.Router();
router
  .get("/all", getItems)
  .get("/description", getItemByDescription)
  .get("/type", getItemByType)
  .get("/name", getItemByName)
  .get("/:id", getItem)
  .post("/", createItem)
  .put("/:id", updateItem)
  .delete("/:id", deleteItem);

export default router;