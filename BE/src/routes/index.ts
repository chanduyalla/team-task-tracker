import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import authRoutes from "./auth-routes/index.js";
import userRoutes from "./users/index.js";
import projectRoutes from "./projects/index.js";
import taskRoutes from "./task-management/index.js";
import analyticsRoutes from "./analytics/index.js";

const router = Router();

router.get("/ping", (req, res) => {
  res.status(200).send({ message: "server is active" });
});

router.use("/auth", authRoutes);

router.use(authenticateUser);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
