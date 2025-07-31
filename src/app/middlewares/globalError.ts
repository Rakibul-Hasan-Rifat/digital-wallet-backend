/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const globalError = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status =  (err instanceof AppError) ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
console.log(err);

  res.status(status).json({
    success: false,
    status,
    message,
    err
  });
};

export default globalError;
