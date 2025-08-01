import { JwtPayload } from "jsonwebtoken";
import environmentVariables from "../config/env.config";
import AppError from "./AppError";
import { generateToken } from "./jwt";

export const createToken = (payload: JwtPayload) => {
  if (!payload._id || !payload.email || !payload.role) {
    throw new AppError(
      400,
      "UserID, Email and Role should be given to create token."
    );
  }

  const accessToken = generateToken(
    {
      _id: payload._id,
      email: payload.email,
      role: payload.role,
    },
    environmentVariables.JWT_ACCESS_SECRET
  );

  const refreshToken = generateToken(
    {
      _id: payload._id,
      email: payload.email,
      role: payload.role,
    },
    environmentVariables.JWT_REFRESH_SECRET
  );

  return {
    accessToken,
    refreshToken,
  };
};
