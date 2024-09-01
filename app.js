// app.js

import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1", uploadRoutes);

export default app;
