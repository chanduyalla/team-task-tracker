import Joi from "joi";

export const getUserByIdValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const createUserValidationSChema = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
  }),
};

export const updateUserValidationSChema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    role: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
  }),
};

export const deleteUserValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
