import express from "express";
import {
  getCarts,
  getCart,
  getCartByCustomer,
  getCartByStore,
  createCart,
  changeQuantity,
  deleteCart,
} from "../controllers/cartController.js";

const router = express.Router();
router
  .get("/all", getCarts)
  .get("/customer/:id", getCartByCustomer)
  .get("/store/:id", getCartByStore)
  .get("/:id", getCart)
  .post("/", createCart)
  .put("/quantity", changeQuantity)
  .delete("/all/:id", deleteCart)

export default router;
