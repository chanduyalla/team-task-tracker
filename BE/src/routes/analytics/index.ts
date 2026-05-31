import { Router } from "express";
import {
  getAverageTaskCompletionTime,
  getOverdueTasksPerUser,
} from "./analyticsHandler.js";
import { checkPermission } from "../../middlewares/checkPermission.js";

const router = Router();

router.get(
  "/tasks/overdue",
  checkPermission("TASKS", "ANALYTICS"),
  getOverdueTasksPerUser,
);

router.get(
  "/tasks/average-completion-time",
  checkPermission("TASKS", "ANALYTICS"),
  getAverageTaskCompletionTime,
);

export default router;
