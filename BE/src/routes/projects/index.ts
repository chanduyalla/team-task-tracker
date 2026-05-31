import { Router } from "express";
import {
  addUsertoProject,
  createProject,
  deleteProject,
  getPeojects,
  getProjectById,
  updateProject,
} from "./projectsHandler.js";
import { checkPermission } from "../../middlewares/checkPermission.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createProjectValidationSChema,
  deleteProjectValidationSchema,
  getProjectByIdValidationSchema,
  updateProjectValidationSChema,
} from "../../validations/projectValidation.js";

const router = Router();

router.get("/", checkPermission("PROJECTS", "READ"), getPeojects);

router.get(
  "/:id",
  checkPermission("PROJECTS", "READ"),
  validateRequest(getProjectByIdValidationSchema),
  getProjectById,
);

router.post(
  "/",
  checkPermission("PROJECTS", "CREATE"),
  validateRequest(createProjectValidationSChema),
  createProject,
);

router.put(
  "/:id",
  checkPermission("PROJECTS", "UPDATE"),
  validateRequest(updateProjectValidationSChema),
  updateProject,
);

router.delete(
  "/:id",
  checkPermission("PROJECTS", "DELETE"),
  validateRequest(deleteProjectValidationSchema),
  deleteProject,
);

router.post("/:id/add-member", addUsertoProject);

export default router;
