import type { Request } from "express";
import { prisma } from "../prismaClient.js";

class ProjectsController {
  async fetchProjects(req: Request) {
    try {
      const projects = await prisma.project.findMany();
      return projects;
    } catch (error) {
      throw error;
    }
  }
  async fetchProjectById(req: Request) {
    try {
      const projectId = Number(req.params.id);
      const project = await prisma.project.findUnique({
        where: { id: projectId },
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
      const newProject = await prisma.project.findMany();
      return { message: "Project created successfully", data: newProject };
    } catch (error) {
      throw error;
    }
  }
  async updateProject(req: Request) {
    try {
      const project = await prisma.project.findMany();
      return { message: "Project updated successfully", data: project };
    } catch (error) {
      throw error;
    }
  }
  async deleteProject(req: Request) {
    try {
      const projectId = Number(req.params.id);
      await prisma.project.update({
        where: { id: projectId },
        data: { deleted_at: new Date(), deleted_by: req.currentUser.id },
      });

      return { message: "Project deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

export default ProjectsController;
