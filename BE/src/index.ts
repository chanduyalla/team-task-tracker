import dotenv from "dotenv";
dotenv.config();
import express from "express";
import apiRoute from "./routes/index.js";

const app = express();

app.use(express.json());
app.use("/api/v1", apiRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
