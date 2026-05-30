import type { Request } from "express";
import { prisma } from "../prismaClient.js";
import { TASK_TRANSITIONS } from "../lib/constant.js";

class TaskManagementController {
  async fetchTasks(req: Request) {
    try {
      const whereCondition: any = {
        deleted_at: null,
        deleted_by: null,
      };
      if (req.query.projectId) {
        whereCondition.projectId = Number(req.query.projectId);
      }
      const limit = Number(req.query.limit) || 10;
      const offset = Number(req.query.offset) || 0;
      const sortBy: any = req.query.sortBy || "updated_at";
      const sortDirection = req.query?.sortDirection === "asc" ? "asc" : "desc";
      const tasks = await prisma.task.findMany({
        where: whereCondition,
        take: limit,
        skip: offset,
        orderBy: { [sortBy]: sortDirection },
      });

      const tasksWithNext = tasks.map((task) => ({
        ...tasks,
        nextTransitions: TASK_TRANSITIONS[task.status] || [],
      }));

      return tasksWithNext;
    } catch (error) {
      throw error;
    }
  }
  async fetchTaskById(req: Request) {
    try {
      const taskId = Number(req.params.id);
      const task = await prisma.task.findUnique({ where: { id: taskId } });

      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }

      const taskWithNext = {
        ...task,
        nextTransitions: TASK_TRANSITIONS[task?.status] || [],
      };

      return taskWithNext;
    } catch (error) {
      throw error;
    }
  }
  async createTask(req: Request) {
    try {
      const data = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        created_by: req.currentUser.id,
      };
      const newTask = await prisma.task.create({ data });

      return { message: "Task created successfully", data: newTask };
    } catch (error) {
      throw error;
    }
  }
  async updateTask(req: Request) {
    try {
      const taskId = Number(req.params.id);
      const task = await prisma.task.update({
        where: { id: taskId },
        data: { updated_by: req.currentUser.id },
      });

      return { message: "Task updated successfully", data: task };
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(req: Request) {
    try {
      const taskId = Number(req.params.id);
      await prisma.task.update({
        where: { id: taskId },
        data: { deleted_at: new Date(), deleted_by: req.currentUser.id },
      });
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

export default TaskManagementController;
