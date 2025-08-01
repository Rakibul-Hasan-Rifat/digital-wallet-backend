import { JwtPayload } from "jsonwebtoken";
import AppError from "../../utils/AppError";
import User from "../user/user.model";
import IWallet from "./wallet.interface";
import Wallet from "./wallet.model";
import { Role } from "../user/user.interface";

const getAllWalletService = async () => {
  const wallets = await Wallet.find();
  const walletCount = await Wallet.countDocuments();

  return { wallets, walletCount };
};

const createWalletService = async (payload: IWallet) => {
  const isWalletAvailable = await Wallet.findOne({ owner: payload.owner });

  if (isWalletAvailable) {
    throw new AppError(409, "Already there is a wallet for the user.");
  }

  const isUserAvailable = await User.findById(payload.owner);

  if (!isUserAvailable) {
    throw new AppError(
      404,
      "The user-id is not found to make a wallet for him/her."
    );
  }

  if (isUserAvailable.role === "AGENT") {
    payload.balance = 150;
  }

  const wallet = await Wallet.create(payload);

  return wallet;
};

const updateWalletService = async (
  walletId: string,
  payload: Partial<IWallet>,
  decodedUser: JwtPayload
) => {
  const isWalletAvailable = await Wallet.findById(walletId);

  if (!isWalletAvailable) {
    throw new AppError(
      404,
      "The wallet with this id is not found in database to update."
    );
  }

  if (payload.isBlocked) {
    if (decodedUser.role === Role.USER) {
      throw new AppError(403, "You are not authorized.");
    }
  }

  if (payload.balance) {
    if (
      isWalletAvailable.owner !== decodedUser._id ||
      decodedUser.role !== Role.AGENT
    ) {
      throw new AppError(403, "You are not authorized.");
    }
  }
};

const addMoneyToWalletService = async (
  walletId: string,
  payload: JwtPayload,
  decodedUser: JwtPayload
) => {
  const isWalletAvailable = await Wallet.findById(walletId);

  if (!isWalletAvailable) {
    throw new AppError(
      404,
      "The wallet with this id is not found in database to update."
    );
  }  

  if (
    isWalletAvailable.owner !== decodedUser._id &&
    decodedUser.role !== Role.AGENT
  ) {
    throw new AppError(403, "You are not authorized.");
  }

  const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {
    $inc: { balance: payload.amount },
  }, {runValidators: true, new: true});

  return updatedWallet;

};

const withdrawMoneyFromWalletService = async (
  walletId: string,
  payload: JwtPayload,
  decodedUser: JwtPayload
) => {
  const isWalletAvailable = await Wallet.findById(walletId);

  if (!isWalletAvailable) {
    throw new AppError(
      404,
      "The wallet with this id is not found in database to update."
    );
  }  

  if (
    isWalletAvailable.owner !== decodedUser._id &&
    decodedUser.role !== Role.AGENT
  ) {
    throw new AppError(403, "You are not authorized.");
  }

  const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {
    $inc: { balance: -payload.amount },
  }, {runValidators: true, new: true});

  return updatedWallet;

};

const deleteWalletService = async (walletId: string) => {
  await Wallet.findByIdAndDelete(walletId);
};

const walletServices = {
  getAllWalletService,
  createWalletService,
  updateWalletService,
  deleteWalletService,
  addMoneyToWalletService,
  withdrawMoneyFromWalletService
};
export default walletServices;
