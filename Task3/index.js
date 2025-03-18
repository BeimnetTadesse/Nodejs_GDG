import express, { json, urlencoded } from "express";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";
import process from "node:process";
import { logger } from "./src/utils/logger.js";  

dotenv.config();

const app = express();
const port = process.env.PORT || 5001; // Default to 5001 if PORT is not set

app.use(json()); // Parses incoming JSON requests
app.use(urlencoded({ extended: true })); // Parses URL-encoded requests
app.use(logger); // Logs each request

app.use("/api", routes); // Prefix routes with "/api"

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" }); // Handles undefined routes
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
