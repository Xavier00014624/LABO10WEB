import bcrypt from "bcrypt";
import { pool } from "../db/connection.js";

export const getUsers = (req, res) => {
  pool.query("SELECT id, name, email FROM users ORDER BY id ASC", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT id, name, email FROM users WHERE id = $1", [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash al password
    const hash = await bcrypt.hash(password, 10);

    pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hash],
      (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "Usuario creado", id: result.rows[0].id });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario" });
  }
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (err) => {
      if (err) throw err;
      res.status(200).json({ message: "Usuario actualizado" });
    }
  );
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (err) => {
    if (err) throw err;
    res.status(200).json({ message: "Usuario eliminado" });
  });
};
