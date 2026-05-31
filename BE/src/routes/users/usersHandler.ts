import type { Request, Response } from "express";
import {
  customResponse,
  sendErrorResponse,
} from "../../lib/custom-response.js";
import UserController from "../../controllers/user-controller.js";

const userController = new UserController();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await userController.fetchUsers(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const response = await userController.fetchUserById(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await userController.createUser(req);
    customResponse(201, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await userController.updateUser(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await userController.deleteUser(req);
    customResponse(200, response, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
