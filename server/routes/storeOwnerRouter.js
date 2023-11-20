import express from "express";
import {
  getStoreOwners,
  getStoreOwner,
  createStoreOwner,
  updateStoreOwner,
  deleteStoreOwner,
  loginStoreOwner,
} from "../controllers/storeOwnerController.js";

const router = express.Router();
router
  .get("/all", getStoreOwners)
  .get("/login", loginStoreOwner)
  .get("/:id", getStoreOwner)
  .post("/", createStoreOwner)
  .put("/:id", updateStoreOwner)
  .delete("/:id", deleteStoreOwner);

export default router;