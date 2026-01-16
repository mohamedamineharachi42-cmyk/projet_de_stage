import express from "express";
import clientsRoutes from "./routes/client.routes.js";

const app = express();

app.use(express.json());

app.use("/clients", clientsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

export default app;
