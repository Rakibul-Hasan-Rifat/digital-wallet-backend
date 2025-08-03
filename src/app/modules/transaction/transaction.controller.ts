import { NextFunction, Request, Response } from "express";
import asyncCatch from "../../utils/asyncCatch";
import transactionServices from "./transaction.service";
import responseSernder from "../../utils/reponseSender";

const createTransactionController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("create transaction controller", req.user);

    const result = await transactionServices.createTransactionService(
      req.body,
      req.user
    );

    responseSernder(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: "Transactions created successfully!",
    });
  }
);

const getAllTransactionController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await transactionServices.getAllTransactionService();

    responseSernder(res, {
      success: true,
      statusCode: 200,
      data: result.data,
      meta: result.meta,
      message: "Transactions retrieved successfully!",
    });
  }
);

const getMyTransactionController = asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await transactionServices.getMyTransactionService(req.params.id);

    responseSernder(res, {
      success: true,
      statusCode: 200,
      data: result.data,
      meta: result.meta,
      message: "Transactions retrieved successfully!",
    });
  }
);

const transactionControllers = {
  getMyTransactionController,
  getAllTransactionController,
  createTransactionController,
};

export default transactionControllers;
