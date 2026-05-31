import type { Request } from "express";
import { prisma } from "../prismaClient.js";

class ProjectsController {
  async fetchProjects(req: Request) {
    try {
      const whereCondition: any = {
        deleted_at: null,
        deleted_by: null,
      };
      const limit = Number(req.query.limit) || 10;
      const offset = Number(req.query.offset) || 0;
      const sortBy: any = req.query.sortBy || "updated_at";
      const sortDirection = req.query?.sortDirection === "asc" ? "asc" : "desc";
      const projects = await prisma.project.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: { [sortBy]: sortDirection },
      });
      return projects;
    } catch (error) {
      throw error;
    }
  }
  async fetchProjectById(req: Request) {
    try {
      const projectId = Number(req.params.id);
      if (isNaN(projectId)) {
        throw new Error("INVALID_PROJECT_ID");
      }
      const project = await prisma.project.findUnique({
        where: { id: projectId, deleted_at: null, deleted_by: null },
      });
      if (!project) {
        throw new Error("PROJECT_NOT_FOUND");
      }
      return project;
    } catch (error) {
      throw error;
    }
  }
  async createProject(req: Request) {
    try {
      const data = {
        name: req.body.name,
        description: req.body.description,
        created_by: req.currentUser.id,
      };
      const newProject = await prisma.project.create({ data });
      return { message: "Project created successfully", data: newProject };
    } catch (error) {
      throw error;
    }
  }
  async updateProject(req: Request) {
    try {
      const projectId = Number(req.params.id);
      if (isNaN(projectId)) {
        throw new Error("INVALID_TASK_ID");
      }

      const project = await prisma.project.findUnique({
        where: { id: projectId, deleted_at: null, deleted_by: null },
      });

      if (!project) {
        throw new Error("PROJECT_NOT_FOUND");
      }

      const updateData: any = {};

      if (req.body.name) updateData.name = req.body.name;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.managerId) updateData.manager_id = req.body.managerId;
      if (req.body.isActive) updateData.is_active = req.body.isActive;

      updateData.updated_by = req.currentUser.id;

      console.log(Object.keys(updateData).length);

      if (Object.keys(updateData).length < 2) {
        throw new Error("NO_FIELDS_TO_UPDATE");
      }
      const updatedProject = await prisma.task.update({
        where: { id: projectId },
        data: updateData,
      });

      return { message: "Project updated successfully", data: updatedProject };
    } catch (error) {
      throw error;
    }
  }
  async deleteProject(req: Request) {
    try {
      const projectId = Number(req.params.id);
      if (isNaN(projectId)) {
        throw new Error("INVALID_TASK_ID");
      }
      const project = await prisma.project.findUnique({
        where: { id: projectId, deleted_at: null, deleted_by: null },
      });

      if (!project) {
        throw new Error("PROJECT_NOT_FOUND");
      }

      await prisma.project.update({
        where: { id: projectId },
        data: { deleted_at: new Date(), deleted_by: req.currentUser.id },
      });

      return { message: "Project deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  async addUsertoProject(req: Request) {
    try {
      const projectId = Number(req.params.id);
      const userId = Number(req.body.userId);

      if (isNaN(projectId) || isNaN(userId)) {
        throw new Error("INVALID_IDS");
      }
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        throw new Error("PROJECT_NOT_FOUND");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      const existing = await prisma.projectMember.findFirst({
        where: {
          project_id: projectId,
          user_id: userId,
        },
      });

      if (existing) {
        if (existing.is_active) {
          throw new Error("USER_ALREADY_IN_PROJECT");
        }

        // If previously removed, reactivate instead of inserting again
        const updated = await prisma.projectMember.update({
          where: { id: existing.id },
          data: { is_active: true },
        });

        return {
          message: "User re-added to project",
          data: updated,
        };
      }

      const member = await prisma.projectMember.create({
        data: {
          project_id: projectId,
          user_id: userId,
          is_active: true,
        },
      });

      return {
        message: "User added to project successfully",
        data: member,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default ProjectsController;
