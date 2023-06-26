import express from "express";
import * as SKUController from "./SKU/SKU.controller";

const router = express.Router();

// SKU API
router.get("/sku", SKUController.getSKUQty);

export default router;

