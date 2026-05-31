import type { Request, Response, NextFunction } from "express";
import { prisma } from "../prismaClient.js";
import { sendErrorResponse } from "../lib/custom-response.js";

export const checkPermission = (resourceName: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUser?.id;

      if (!userId) {
        throw new Error("UNAUTHORIZED");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          role: true,
        },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      const permission = await prisma.rolePermission.findFirst({
        where: {
          role: {
            name: user.role.name,
          },
          resource: {
            name: resourceName,
          },
          permission: {
            action: action,
          },
        },
      });

      if (!permission) {
        throw new Error("FORBIDDEN");
      }

      next();
    } catch (error) {
      sendErrorResponse(error, res);
    }
  };
};
