import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import environmentVariables from "../config/env.config";
import AppError from "../utils/AppError";
import User from "../modules/user/user.model";
import { JwtPayload } from "jsonwebtoken";

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError(403, "Access denied as unauthorized.");
  }

  const verifiedUser = verifyToken(
    req.cookies.accessToken,
    environmentVariables.JWT_ACCESS_SECRET
  );

  const isUserAvailable = User.findOne({
    email: (verifiedUser as JwtPayload).email,
  });

  if(!isUserAvailable) {
    throw new AppError(404, "User not found.")
  }

  if(!authRoles.includes((verifiedUser as JwtPayload).role)) {
    throw new AppError(403, "Access Denied as Unauthorized.")
  }

  req.user = verifiedUser as JwtPayload;

  next();
};

export default checkAuth;
