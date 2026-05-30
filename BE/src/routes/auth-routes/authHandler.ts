import type { Request, Response } from "express";
import {
  customResponse,
  sendErrorResponse,
} from "../../lib/custom-response.js";
import AuthController from "../../controllers/auth-controller.js";

const authController = new AuthController();

export const Login = async (req: Request, res: Response) => {
  try {
    const response = await authController.Login(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getRefreshToken = async (req: Request, res: Response) => {
  try {
    const response = await authController.refreshToken(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
