import type { Request } from "express";
import { prisma } from "../prismaClient.js";
import { hashPassword } from "../utils/password.js";

class UserController {
  async fetchUsers(req: Request) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async fetchUserById(req: Request) {
    try {
      const userId = Number(req.params.id);
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(req: Request) {
    try {
      const role = await prisma.role.findUnique({
        where: { name: req?.body?.role || "MEMBER" },
      });

      if (!role) {
        throw new Error("invalid role");
      }

      const baseData = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      };

      const newUser = await prisma.user.create({
        data: {
          ...baseData,
          role: {
            connect: {
              id: role.id,
            },
          },
          ...(req.currentUser?.id && {
            createdBy: {
              connect: { id: req.currentUser.id },
            },
          }),
        },
      });
      return {
        message: "User created successfully",
        data: { id: newUser.id, email: newUser.email },
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUser(req: Request) {
    try {
      const userId = req.params.id;

      return { message: "User updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(req: Request) {
    try {
      const userId = Number(req.params.id);
      await prisma.project.update({
        where: { id: userId },
        data: { deleted_at: new Date(), deleted_by: req.currentUser.id },
      });

      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;
