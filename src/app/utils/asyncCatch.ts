import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

type AsyncCatch = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncCatch =
  (cb: AsyncCatch) => async (req: Request, res: Response, next: NextFunction) => {
    await Promise.resolve(cb(req, res, next)).catch(err => {
        throw new AppError(500, err.message);
    })
  };

export default asyncCatch;