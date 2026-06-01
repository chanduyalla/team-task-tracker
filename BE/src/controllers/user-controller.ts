import type { Request } from "express";
import { prisma } from "../prismaClient.js";
import { hashPassword } from "../utils/password.js";

class UserController {
  async fetchUsers(req: Request) {
    try {
      const whereCondition: any = {
        deleted_at: null,
        deleted_by: null,
      };
      const limit = Number(req.query.limit) || 10;
      const offset = Number(req.query.offset) || 0;
      const sortBy: any = req.query.sortBy || "updated_at";
      const sortDirection = req.query?.sortDirection === "asc" ? "asc" : "desc";
      const users = await prisma.user.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          is_active: true,
          role: true,
        },
        where: whereCondition,
        take: limit,
        skip: offset,
        orderBy: { [sortBy]: sortDirection },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async fetchUserById(req: Request) {
    try {
      const userId = Number(req.params.id);
      if (isNaN(userId)) {
        throw new Error("INVALID_USER_ID");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId, deleted_at: null, deleted_by: null },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          is_active: true,
          role: true,
        },
      });

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
      const existingUser = await prisma.user.findFirst({
        where: {
          email: {
            equals: req.body.email,
            mode: "insensitive",
          },
        },
      });

      if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS_WITH_THIS_EMAIL");
      }
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
      const userId = Number(req.params.id);

      if (isNaN(userId)) {
        throw new Error("INVALID_USER_ID");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId, deleted_at: null, deleted_by: null },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      if (req.body.email && user.email === req.body.email) {
        throw new Error("USER_ALREADY_EXISTS_WITH_THIS_EMAIL");
      }

      const updateData: any = {};

      if (req.body.firstName) updateData.first_name = req.body.firstName;
      if (req.body.lastName) updateData.last_name = req.body.lastName;
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.password)
        updateData.password = await hashPassword(req.body.password);
      if (req.body.isActive) updateData.is_active = req.body.isActive;

      updateData.updated_by = req.currentUser.id;

      console.log(Object.keys(updateData).length);

      if (Object.keys(updateData).length < 2) {
        throw new Error("NO_FIELDS_TO_UPDATE");
      }
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      return { message: "Project updated successfully", data: updatedUser };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(req: Request) {
    try {
      const userId = Number(req.params.id);
      if (isNaN(userId)) {
        throw new Error("INVALID_USER_ID");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId, deleted_at: null, deleted_by: null },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
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
