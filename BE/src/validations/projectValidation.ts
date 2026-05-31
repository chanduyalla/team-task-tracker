import Joi from "joi";

export const getProjectByIdValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const createProjectValidationSChema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

export const updateProjectValidationSChema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
  }),
};

export const deleteProjectValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
