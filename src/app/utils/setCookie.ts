import { Response } from "express";
import environmentVariables from "../config/env.config";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const setCookie = (res: Response, tokens: Tokens) => {
  if (tokens.accessToken) {
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: environmentVariables.NODE_ENV === "production",
      sameSite: environmentVariables.NODE_ENV === "production" ? "none" : "none",
    });
  }
  if (tokens.refreshToken) {
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: environmentVariables.NODE_ENV === "production",
      sameSite: environmentVariables.NODE_ENV === "production" ? "none" : "none",
    });
  }
};

export default setCookie;
