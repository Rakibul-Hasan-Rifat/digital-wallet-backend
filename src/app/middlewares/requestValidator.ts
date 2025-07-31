import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../utils/AppError";

const requestValidator =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new AppError(
        400,
        `Zod Validation Error. ${JSON.parse(error.message)[0].message}`
      );
    }
  };

export default requestValidator;
