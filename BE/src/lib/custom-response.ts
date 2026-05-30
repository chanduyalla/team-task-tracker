import type { Response } from "express";
import { errorCodes } from "./error-codes.js";

interface CustomResponse {
  message?: string;
  [key: string]: any;
}

export const customResponse = (
  statusCode: number,
  data: any,
  res: Response,
) => {
  if ([200, 201].includes(statusCode)) {
    return res.status(statusCode).send({
      success: true,
      data: data,
    });
  } else {
    return res.status(statusCode || 500).send({
      success: false,
      error: data || "Something went wrong",
    });
  }
};

export const sendErrorResponse = (error: any, res: Response) => {
  const errorCode = error?.response?.data.message || error.message;
  const errorObject = errorCodes[errorCode as keyof typeof errorCodes] || {
    statusCode: error?.response?.status || error.statusCode,
    errorMessage: errorCode,
  };

  let finalStatusCode = 500;
  if (errorObject.statusCode) {
    const numbericStatus = Number(errorObject.statusCode);
    if (
      !isNaN(numbericStatus) &&
      numbericStatus >= 100 &&
      numbericStatus < 600
    ) {
      finalStatusCode = numbericStatus;
    }
  }
  res.status(finalStatusCode).send({
    success: false,
    status: finalStatusCode,
    code: errorCode,
    message: errorObject.errorMessage,
  });
};
