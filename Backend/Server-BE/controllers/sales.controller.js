import { pool } from "../db/connection.js";

export const createSale = async (req, res) => {
  try {
    const { amount, id_customer } = req.body;

    if (!amount || !id_customer) {
      return res.status(400).json({ message: "amount e id_customer son requeridos" });
    }

   
    const customerCheck = await pool.query(
      "SELECT id FROM customers WHERE id = $1",
      [id_customer]
    );

    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    const result = await pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *",
      [amount, id_customer]
    );

    res.status(201).json({
      message: "Venta registrada correctamente",
      sale: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registrando venta" });
  }
  
};

export const getSales = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.amount,
        s.created_at,
        c.name AS customer_name
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      ORDER BY s.id ASC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo ventas" });
  }
};

export const getSalesReport = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.name, SUM(s.amount) AS total_sales
            FROM sales s
            JOIN customers c ON s.id_customer = c.id
            GROUP BY c.name
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error getting sales report:", error);
        res.status(500).json({ error: "Error obteniendo el reporte" });
    }
};
