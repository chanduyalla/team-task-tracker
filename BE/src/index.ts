import dotenv from "dotenv";
dotenv.config();
import express from "express";
import apiRoute from "./routes/index.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
  `${process.env.FRONTEND_URL}`,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());
app.use("/api/v1", apiRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
