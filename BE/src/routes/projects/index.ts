import { Router } from "express";
import {
  createProject,
  deleteProject,
  getPeojects,
  getProjectById,
  updateProject,
} from "./projectsHandler.js";

const router = Router();

router.get("/", getPeojects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
