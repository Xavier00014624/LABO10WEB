import { Router } from "express";
import { pool } from "../db/connection.js";
import { searchCustomerByCode } from "../controllers/customers.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo clientes" });
  }
});
router.get("/search", searchCustomerByCode);
export default router;
