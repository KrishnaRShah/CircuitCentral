import express from "express";
import {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
  getShippingCompany,
  getStoreOwner,
} from "../controllers/storeController.js";

const router = express.Router();
router
  .get("/all", getStores)
  .get("/:id", getStore)
  .get("/:id/shippingCompany", getShippingCompany)
  .get("/:id/storeOwner", getStoreOwner)
  .post("/", createStore)
  .put("/:id", updateStore)
  .delete("/:id", deleteStore);

  export default router;
