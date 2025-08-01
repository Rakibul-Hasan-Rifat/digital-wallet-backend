import { Request, Response } from "express";
import walletServices from "./wallet.service";
import asyncCatch from "../../utils/asyncCatch";
import responseSernder from "../../utils/reponseSender";
import { JwtPayload } from "jsonwebtoken";

const getWalletController = asyncCatch(async (req: Request, res: Response) => {
  const result = await walletServices.getAllWalletService();

  responseSernder(res, {
    success: true,
    statusCode: 200,
    message: "Wallets are retrieved successfully.",
    data: result.wallets,
    meta: {
      total: result.walletCount,
    },
  });
});

const createWalletController = asyncCatch(
  async (req: Request, res: Response) => {
    const result = await walletServices.createWalletService(req.body);

    responseSernder(res, {
      success: true,
      statusCode: 201,
      data: result,
      message: "Wallet created successfully.",
    });
  }
);

const updateWalletController = asyncCatch(
  async (req: Request, res: Response) => {

    const result = await walletServices.updateWalletService(
      req.params.id,
      req.body,
      req.user as JwtPayload
    );

    responseSernder(res, {
      success: true,
      statusCode: 200,
      message: "Wallet has been successfully updated.",
      data: result,
    });
  }
);

const addMoneyToWalletController = asyncCatch(
  async (req: Request, res: Response) => {
    const result = await walletServices.addMoneyToWalletService(
      req.params.id,
      req.body,
      req.user
    );

    responseSernder(res, {
      success: true,
      data: result,
      statusCode: 200,
      message: "Update operatoin over wallet-doc is successful",
    });
  }
);

const withdrawMoneyFromWalletController = asyncCatch(
  async (req: Request, res: Response) => {
    const result = await walletServices.withdrawMoneyFromWalletService(
      req.params.id,
      req.body,
      req.user
    );

    responseSernder(res, {
      success: true,
      data: result,
      statusCode: 200,
      message: "Update operatoin over wallet-doc is successful",
    });
  }
);

const deleteWalletController = asyncCatch(
  async (req: Request, res: Response) => {
    await walletServices.deleteWalletService(req.body);

    responseSernder(res, {
      success: true,
      statusCode: 209,
      data: null,
      message: "Wallet deleted successfully.",
    });
  }
);

const walletControllers = {
  getWalletController,
  createWalletController,
  updateWalletController,
  deleteWalletController,
  addMoneyToWalletController,
  withdrawMoneyFromWalletController
};

export default walletControllers;
