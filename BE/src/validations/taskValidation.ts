import { TaskPriority, TaskStatus } from "@prisma/client";
import Joi from "joi";

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
    assignee: Joi.number().optional(),
  }),
};

export const deleteTaskValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
