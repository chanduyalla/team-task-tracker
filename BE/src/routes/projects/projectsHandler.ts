import type { Request, Response } from "express";
import {
  customResponse,
  sendErrorResponse,
} from "../../lib/custom-response.js";
import ProjectsController from "../../controllers/projects-controller.js";

const projectsController = new ProjectsController();

export const getPeojects = async (req: Request, res: Response) => {
  try {
    const result = await projectsController.fetchProjects(req);
    customResponse(200, result, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const result = await projectsController.fetchProjectById(req);
    customResponse(200, result, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const result = await projectsController.createProject(req);
    customResponse(201, result, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const result = await projectsController.updateProject(req);
    customResponse(200, result, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const result = await projectsController.deleteProject(req);
    customResponse(200, result, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
