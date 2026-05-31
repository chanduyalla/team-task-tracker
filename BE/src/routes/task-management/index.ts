import { Router } from "express";
import {
  assignTaskToMember,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "./taskManagementHandler.js";
import { checkPermission } from "../../middlewares/checkPermission.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createTaskValidationSChema,
  deleteTaskValidationSchema,
  getTaskByIdValidationSchema,
  updateTaskValidationSChema,
} from "../../validations/taskValidation.js";

const router = Router();

router.get("/", checkPermission("TASKS", "READ"), getTasks);

router.get(
  "/:id",
  checkPermission("TASKS", "READ"),
  validateRequest(getTaskByIdValidationSchema),
  getTaskById,
);

router.post(
  "/",
  checkPermission("TASKS", "CREATE"),
  validateRequest(createTaskValidationSChema),
  createTask,
);

router.put(
  "/:id",
  checkPermission("TASKS", "UPDATE"),
  validateRequest(updateTaskValidationSChema),
  updateTask,
);

router.delete(
  "/:id",
  checkPermission("TASKS", "DELETE"),
  validateRequest(deleteTaskValidationSchema),
  deleteTask,
);

router.put(
  "/:id/assign",
  checkPermission("TASKS", "UPDATE"),
  assignTaskToMember,
);

export default router;
