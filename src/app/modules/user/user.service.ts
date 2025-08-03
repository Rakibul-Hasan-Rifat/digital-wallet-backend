import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import User from "./user.model";
import AppError from "../../utils/AppError";
import IUser, { Role } from "./user.interface";
import walletServices from "../wallet/wallet.service";
import environmentVariables from "../../config/env.config";

const createUserService = async (payload: Partial<IUser>) => {

  if (!payload.email) {
    throw new AppError(400, "Email is not provided!");
  }

  const isUserAvailable = await User.findOne({ email: payload.email });

  if (isUserAvailable) {
    throw new AppError(
      409,
      "User with the given mail exists already in database."
    );
  }

  const user = await User.create(payload);

  if (!user) {
    throw new AppError(500, "User hasn't been created.");
  }

  const wallet = await walletServices.createWalletService({ owner: user._id });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userInfo } = user.toObject();

  return { user: userInfo, wallet };
};

const getUserService = async () => {
  const users = await User.find({ role: "USER" });
  const userCount = await User.countDocuments({ role: "USER" });
  return { users, userCount };
};

const getAgentService = async () => {
  const users = await User.find({ role: "AGENT" });
  const userCount = await User.countDocuments({ role: "AGENT" });
  return { users, userCount };
};

const updateUserService = async (
  userId: string,
  payload: Partial<IUser>,
  decodedUser: JwtPayload
) => {
  // name, password, isActive, role, agentStatus

  if (!userId) {
    throw new AppError(400, `UserID as request-param is not found to update.`);
  }

  const isUserAvailable = await User.findById(userId);

  if (!isUserAvailable) {
    throw new AppError(
      404,
      "Ther user with the given id is not found in database to update."
    );
  }

  if (payload.isActive || payload.role || payload.agentStatus) {
    if (decodedUser.role !== Role.ADMIN) {
      throw new AppError(403, "You are not authorized.");
    }
  }

  if (payload.name || payload.password) {
    if (userId !== decodedUser._id) {
      throw new AppError(400, "Only user can change his name and password.");
    }
  }

  if (payload.agentStatus) {
    const isAgent = isUserAvailable.role === Role.AGENT;

    if (!isAgent) {
      throw new AppError(
        400,
        "You can only suspend/approve agents, not users."
      );
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      parseInt(environmentVariables.SALT_ROUND)
    );
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  const updatedUserObject = updatedUser?.toObject()

  
  for (const key in updatedUserObject) {
    if (key === "password") {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete updatedUserObject[key];
    }
  }

  return updatedUserObject;
};

const deleteUserService = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

const userServices = {
  getUserService,
  getAgentService,
  createUserService,
  updateUserService,
  deleteUserService,
};

export default userServices;
