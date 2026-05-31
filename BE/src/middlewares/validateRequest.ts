import type { ObjectSchema } from "joi";
import type { Request, Response, NextFunction } from "express";

interface ValidationSchemas {
  params?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
  body?: ObjectSchema<any>;
}

const validateRequest = (schemas: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors: {
      [key: string]: string;
    }[] = [];

    const handleValidation = async (
      schema: ObjectSchema<any>,
      data: any,
      key: string,
    ) => {
      try {
        await schema.validateAsync(data, {
          abortEarly: false,
        });
      } catch (error: any) {
        if (error.details) {
          error.details.forEach((err: any) => {
            validationErrors.push({ [err?.context?.label]: err.message });
          });
        } else {
          validationErrors.push({
            [key]: error.message || "Validation error",
          });
        }
      }
    };
    try {
      // validate route params if schema is provided
      if (schemas.params) {
        await handleValidation(schemas.params, req.params, "params");
      }
      // validate query params if schema is provided
      if (schemas.query) {
        await handleValidation(schemas.query, req.query, "query");
      }
      // validate body if schema is provided
      if (schemas.body) {
        await handleValidation(schemas.body, req.body, "body");
      }
      if (validationErrors.length > 0) {
        res.status(400).json({
          status: 400,
          code: "VALIDATION_ERROR",
          message: "Request validation failed",
          errors: validationErrors,
        });
      }

      next();
    } catch (error) {
      res.status(400).json({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        errors: validationErrors,
      });
    }
  };
};

export default validateRequest;
