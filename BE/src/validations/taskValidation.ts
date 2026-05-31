import { TaskPriority, TaskStatus } from "@prisma/client";
import Joi from "joi";

export const getTasksValidationSchema = {
  query: Joi.object({
    offset: Joi.number().optional(),
    limit: Joi.number().optional(),
    sortBy: Joi.string().optional(),
    sortDirection: Joi.string().optional(),
    projectId: Joi.number().optional(),
    status: Joi.string()
      .optional()
      .valid(...Object.values(TaskStatus)),
    priority: Joi.string()
      .optional()
      .valid(...Object.values(TaskPriority)),
    assignee: Joi.string().optional(),
  }),
};

export const getTaskByIdValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const createTaskValidationSChema = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    priority: Joi.string()
      .optional()
      .valid(...Object.keys(TaskPriority)),
    status: Joi.string()
      .optional()
      .valid(...Object.keys(TaskStatus)),
    dueDate: Joi.date().optional().greater("now"),
    timezone: Joi.when("dueDate", {
      is: Joi.exist(),
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
  }),
};

export const updateTaskValidationSChema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    priority: Joi.string().optional(),
    status: Joi.string().optional(),
    dueDate: Joi.date().greater("now"),
    timezone: Joi.when("dueDate", {
      is: Joi.exist(),
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    assignee: Joi.number().optional(),
  }),
};

export const deleteTaskValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
