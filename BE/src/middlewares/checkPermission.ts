import type { Request, Response, NextFunction } from "express";
import { prisma } from "../prismaClient.js";

export const checkPermission = (resourceName: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUser?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          role: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
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
        return res.status(403).json({
          message: "Forbidden - No permission",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
};
