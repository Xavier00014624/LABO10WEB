import { Router } from "express";
import { createSale, getSales,getSalesReport  } from "../controllers/sales.controller.js";

const router = Router();

router.post("/", createSale);
router.get("/", getSales);
router.get("/report", getSalesReport);   
export default router;
