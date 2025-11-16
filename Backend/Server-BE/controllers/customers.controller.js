import { pool } from "../db/connection.js";

export const searchCustomerByCode = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "El parámetro 'code' es requerido." });
    }

    const { rows } = await pool.query(
      "SELECT * FROM customers WHERE code = $1",
      [code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontró el cliente." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
};
