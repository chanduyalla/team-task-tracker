import type { Request, Response } from "express";
import {
  customResponse,
  sendErrorResponse,
} from "../../lib/custom-response.js";
import AnalyticsController from "../../controllers/analytics-controller.js";

const analyticsController = new AnalyticsController();

export const getOverdueTasksPerUser = async (req: Request, res: Response) => {
  try {
    const tasks = await analyticsController.getOverdueTasksPerUser(req);
    customResponse(200, tasks, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getAverageTaskCompletionTime = async (
  req: Request,
  res: Response,
) => {
  try {
    const tasks = await analyticsController.getAverageTaskCompletionTime(req);
    customResponse(200, tasks, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
