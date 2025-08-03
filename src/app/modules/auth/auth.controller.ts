import { Request, Response } from "express";
import authServices from "./auth.service";
import setCookie from "../../utils/setCookie";
import asyncCatch from "../../utils/asyncCatch";
import responseSernder from "../../utils/reponseSender";

const authCredentialsLoginController = asyncCatch(
  async (req: Request, res: Response) => {
    
    const result = await authServices.authCredentialsLoginService(req.body);

    setCookie(res, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });

    responseSernder(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: "User is logged in successfully.",
    });
  }
);

const logoutController = asyncCatch(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  })
  res.clearCookie("refreshToken", {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  })
  
  responseSernder(res, {
    success: true,
    statusCode: 200,
    message: "User logged out successfully!",
    data: null
  })
})

const authControllers = { logoutController, authCredentialsLoginController };

export default authControllers;
