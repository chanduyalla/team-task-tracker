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
        include: {
          assignedTo: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      });

      const tasksWithNext = tasks.map((task) => ({
        ...task,
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
      if (isNaN(taskId)) {
        throw new Error("INVALID_TASK_ID");
      }
      const task = await prisma.task.findUnique({
        where: { id: taskId, deleted_at: null, deleted_by: null },
        include: {
          assignedTo: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      });

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
  // async fetchTasksForLoggedInUser(req: Request) {
  //   try {
  //     const tasks = await prisma.task.findMany({
  //       where: { assignee: req.currentUser.id },
  //     });
  //     return tasks;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async createTask(req: Request) {
    try {
      const data = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        due_date: req.body.dueDate,
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
      if (isNaN(taskId)) {
        throw new Error("INVALID_TASK_ID");
      }

      const task = await prisma.task.findUnique({
        where: { id: taskId, deleted_at: null, deleted_by: null },
      });

      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }

      if (
        req.currentUser.role === "MEMBER" &&
        task.assignee !== req.currentUser.id
      ) {
        throw new Error("TASK_NOT_ASSIGNED_TO_YOU");
      }
      const updateData: any = {};

      if (req.body.title) updateData.title = req.body.title;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.priority) updateData.priority = req.body.priority;
      if (req.body.status) updateData.status = req.body.status;
      if (req.body.assignee) updateData.assignee = req.body.assignee;
      if (req.body.dueDate) updateData.due_date = req.body.dueDate;

      updateData.updated_by = req.currentUser.id;

      console.log(Object.keys(updateData).length);

      if (Object.keys(updateData).length < 2) {
        throw new Error("NO_FIELDS_TO_UPDATE");
      }
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: updateData,
      });

      return { message: "Task updated successfully", data: updatedTask };
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(req: Request) {
    try {
      const taskId = Number(req.params.id);
      if (isNaN(taskId)) {
        throw new Error("INVALID_TASK_ID");
      }
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });
      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }
      await prisma.task.update({
        where: { id: taskId },
        data: { deleted_at: new Date(), deleted_by: req.currentUser.id },
      });
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  async assignTask(req: Request) {
    try {
      const taskId = Number(req.params.id);
      const assigneeId = Number(req.query.assignedTo);
      if (req.currentUser.role !== "MANAGER") {
        throw new Error("ONLY_MANAGER_CAN_ASSIGN_TASKS");
      }
      if (isNaN(taskId)) {
        throw new Error("INVALID_TASK_ID");
      }

      if (isNaN(assigneeId)) {
        throw new Error("INVALID_ASSIGNEE_ID");
      }
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }
      const user = await prisma.user.findUnique({ where: { id: assigneeId } });
      if (!user) {
        throw new Error("ASSIGNEE_NOT_FOUND");
      }
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { assignee: assigneeId, updated_by: req.currentUser.id },
      });
      return {
        message: "Task assigned successfully",
        data: updatedTask,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default TaskManagementController;
