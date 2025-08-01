import bcrypt from "bcryptjs";
import User from "../user/user.model";
import AppError from "../../utils/AppError";
import { createToken } from "../../utils/createToken";

interface LoginPayload {
  email: string;
  password: string;
}

const authCredentialsLoginService = async (payload: LoginPayload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(400, "Email and password must be given for logging in.");
  }
  const isUserAvailable = await User.findOne({ email: email });

  if (!isUserAvailable) {
    throw new AppError(404, "No user found with your given credentials.");
  }

  if (!isUserAvailable.password) {
    throw new AppError(
      400,
      "You are not logged in with credentials. Please try another way."
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserAvailable.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Your credentials are not acceptable.");
  }

  const tokens = createToken({
    _id: isUserAvailable._id,
    email: isUserAvailable.email,
    role: isUserAvailable.role,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userRestInfo } = isUserAvailable.toObject();

  return {
    user: userRestInfo,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

const authServices = { authCredentialsLoginService };

export default authServices;
