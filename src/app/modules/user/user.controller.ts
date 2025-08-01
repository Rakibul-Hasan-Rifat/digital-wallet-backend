import { NextFunction, Request, Response } from "express";
import asyncCatch from "../../utils/asyncCatch";
import userServices from "./user.service";
import responseSernder from "../../utils/reponseSender";

const createUserController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createUserService(req.body);

    responseSernder(res, {
      success: true,
      statusCode: 201,
      message: "User create successfully!",
      data: result,
    });
  }
);

const getAllUsersController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getUserService();

    responseSernder(res, {
      success: true,
      statusCode: 200,
      message: "User retrieved successfully!",
      data: result.users,
      meta: {
        total: result.userCount
      }
    });
  }
);

const updateUserController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.updateUserService(req.params.id, req.body);

    responseSernder(res, {
      success: true,
      statusCode: 200,
      message: "User retrieved successfully!",
      data: users,
    });
  }
);

const deleteUserController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.deleteUserService(req.params.id);

    responseSernder(res, {
      success: true,
      statusCode: 203,
      message: "User deleted successfully!",
      data: result,
    });
  }
);

const userControllers = {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController
};

export default userControllers;
