import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError";
import IUser from "./user.interface";
import User from "./user.model";
import environmentVariables from "../../config/env.config";

const createUserService = async (payload: Partial<IUser>) => {
  console.log(payload);

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

  // if (payload.password) {
  //   const hashedPassword = await bcrypt.hash(
  //     payload.password,
  //     parseInt(environmentVariables.SALT_ROUND)
  //   );
  //   payload.password = hashedPassword;
  // }

  // payload.authProvider = [
  //   { provider: "credentials", providerId: payload.email },
  // ];

  const user = await User.create(payload);

  const { password, ...userInfo } = user.toObject();

  return userInfo;
};

const getUserService = async () => {
  const users = await User.find();
  return users;
};

const updateUserService = async (userId: string, payload: Partial<IUser>) => {
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
};

const deleteUserService = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

const userServices = {
  createUserService,
  getUserService,
  updateUserService,
  deleteUserService,
};

export default userServices;
