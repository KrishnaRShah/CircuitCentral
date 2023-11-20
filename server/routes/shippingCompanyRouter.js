import express from "express";
import {
  getShippingCompanies,
  getShippingCompany,
  createShippingCompany,
  updateShippingCompany,
  deleteShippingCompany,
} from "../controllers/shippingCompanyController.js";

const router = express.Router();
router
  .get("/all", getShippingCompanies)
  .get("/:id", getShippingCompany)
  .post("/", createShippingCompany)
  .put("/:id", updateShippingCompany)
  .delete("/:id", deleteShippingCompany);

export default router;
