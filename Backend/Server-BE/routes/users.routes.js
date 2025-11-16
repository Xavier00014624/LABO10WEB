import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Rutas protegidas
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);

// Crear usuario con password en hash
router.post("/", createUser);

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
