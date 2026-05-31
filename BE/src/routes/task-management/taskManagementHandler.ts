import type { Request, Response } from "express";
import {
  customResponse,
  sendErrorResponse,
} from "../../lib/custom-response.js";
import TaskManagementController from "../../controllers/task-management-controller.js";

const taskManagementController = new TaskManagementController();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskManagementController.fetchTasks(req);
    customResponse(200, tasks, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskManagementController.fetchTaskById(req);
    customResponse(200, task, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const response = await taskManagementController.createTask(req);
    customResponse(201, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const response = await taskManagementController.updateTask(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const response = await taskManagementController.deleteTask(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const assignTaskToMember = async (req: Request, res: Response) => {
  try {
    const result = await taskManagementController.assignTask(req);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
