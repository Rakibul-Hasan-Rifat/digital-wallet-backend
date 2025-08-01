import { Response } from "express";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const setCookie = (res: Response, tokens: Tokens) => {
  if (tokens.accessToken) {
    res.cookie("accessToken", tokens.accessToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
  }
  if (tokens.refreshToken) {
    res.cookie("refreshToken", tokens.refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
  }
};

export default setCookie;
