import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import salesRoutes from "./routes/sales.routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.json({ info: "API funcionando con módulos" });
});

export default app;
