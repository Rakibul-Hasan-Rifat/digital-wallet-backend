import User from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../utils/AppError";
import Wallet from "../wallet/wallet.model";
import Transaction from "./transaction.model";
import { Role } from "../user/user.interface";
import IWallet from "../wallet/wallet.interface";
import ITransaction, { TransactionType } from "./transaction.interface";

const getAllTransactionService = async () => {
    const transactions = await Transaction.find();
    const transactionCount = await Transaction.countDocuments();

    return {
        data: transactions,
        meta: {
            total: transactionCount,
        },
    };
};

const getMyTransactionService = async (myId: string) => {
    const transactions = await Transaction.find({initiator: myId});
    const transactionCount = await Transaction.countDocuments({initiator: myId});

    return {
        data: transactions,
        meta: {
            total: transactionCount,
        },
    };
};

const createTransactionService = async (
    payload: ITransaction,
    decodedUser: JwtPayload
) => {
    if (!payload.amount || !payload.type) {
        throw new AppError(
            400,
            `To make a perfect transaction, amount and type are required.`
        );
    }

    const isUserAvailable = await User.findOne({ email: decodedUser.email });

    if (!isUserAvailable) {
        throw new AppError(404, "The user not found");
    }

    const isWalletAvailable = await Wallet.findOne({ owner: decodedUser._id });

    if (!isWalletAvailable) {
        throw new AppError(404, "The wallet not found.");
    }

    if (payload.type === TransactionType.TOPUP) {
        // only user can add money to his wallet by topup
        if (decodedUser._id !== isWalletAvailable.owner) {
            throw new AppError(403, "You are not authorized.");
        }
        payload.from = null;
        payload.to = isWalletAvailable._id;
        payload.initiator = decodedUser._id;
    } else if (payload.type === TransactionType.WITHDRAW) {
        // user can withdraw from a wallet
        if (decodedUser._id !== isWalletAvailable.owner) {
            throw new AppError(403, "You are not authorized to withdraw money.");
        }
        if ((isWalletAvailable as IWallet).balance <= payload.amount) {
            throw new AppError(400, "No enough money to withdraw");
        }
        payload.from = isWalletAvailable._id;
        payload.to = null;
        payload.initiator = decodedUser._id;
    } else if (payload.type === TransactionType.CASHIN) {
        // only agent can add money to anyone's wallet by cash-in
        if (!payload.receiverEmail) {
            throw new AppError(400, "Receiver email is required to cash-in.");
        }
        const isReceiverAvailable = await User.findOne({
            email: payload.receiverEmail,
        });
        if (!isReceiverAvailable) {
            throw new AppError(404, "Receiver is not found in database.");
        }
        const isReceiverWalletAvailable = await Wallet.findOne({
            owner: isReceiverAvailable._id,
        });
        if (!isReceiverWalletAvailable) {
            throw new AppError(404, "Receiver's wallet is not found.");
        }
        if ((isWalletAvailable as IWallet).balance < payload.amount) {
            throw new AppError(400, "No enough money to cash-in");
        }
        if (decodedUser.role !== Role.AGENT) {
            throw new AppError(403, "You are not authorized to cashin.");
        }
        payload.from = isWalletAvailable._id;
        payload.to = isReceiverWalletAvailable._id;
        payload.initiator = decodedUser._id;
    } else if (payload.type === TransactionType.CASHOUT) {
        // only agent can cash out the money
        if (!payload.receiverEmail) {
            throw new AppError(400, "Receiver email is required to cash-in.");
        }
        const isReceiverAvailable = await User.findOne({
            email: payload.receiverEmail,
        });
        if (!isReceiverAvailable) {
            throw new AppError(404, "Receiver is not found in database.");
        }
        const isReceiverWalletAvailable = await Wallet.findOne({
            owner: isReceiverAvailable._id,
        });
        if (!isReceiverWalletAvailable) {
            throw new AppError(404, "Receiver's wallet is not found.");
        }
        if (isReceiverWalletAvailable.balance < payload.amount) {
            throw new AppError(400, "No enough money to withdraw");
        }
        if (decodedUser.role !== Role.AGENT) {
            throw new AppError(403, "You are not authorized to cash out money.");
        }
        payload.from = isReceiverWalletAvailable._id;
        payload.to = null;
        payload.initiator = decodedUser._id;
    } else if (payload.type === TransactionType.SEND) {
        if (!payload.receiverEmail) {
            throw new AppError(400, "Receiver email is required to send.");
        }
        const isReceiverAvailable = await User.findOne({
            email: payload.receiverEmail,
        });
        if (!isReceiverAvailable) {
            throw new AppError(404, "Receiver is not found in database.");
        }
        const isReceiverWalletAvailable = await Wallet.findOne({
            owner: isReceiverAvailable._id,
        });
        if (!isReceiverWalletAvailable) {
            throw new AppError(404, "Receiver's wallet is not found.");
        }
        if (decodedUser._id === isReceiverWalletAvailable.owner) {
            throw new AppError(
                403,
                "It is not allowed to send money to the own account."
            );
        }
        payload.from = isWalletAvailable._id;
        payload.to = isReceiverWalletAvailable._id;
        payload.initiator = decodedUser._id;
    }

    const transaction = await Transaction.create(payload);
    let updatedWallet;
    let updatedReceiverWallet;

    // update user's wallet based on the successful transaction
    if (transaction.type === TransactionType.TOPUP) {
        updatedWallet = await Wallet.findByIdAndUpdate(
            transaction.to,
            {
                $inc: { balance: transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
    } else if (transaction.type === TransactionType.WITHDRAW) {
        updatedWallet = await Wallet.findByIdAndUpdate(
            transaction.from,
            {
                $inc: { balance: -transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
    } else if (transaction.type === TransactionType.CASHOUT) {
        updatedReceiverWallet = await Wallet.findByIdAndUpdate(
            transaction.from,
            {
                $inc: { balance: -transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
    } else if (transaction.type === TransactionType.CASHIN) {
        updatedWallet = await Wallet.findByIdAndUpdate(
            transaction.from,
            {
                $inc: { balance: -transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
        updatedReceiverWallet = await Wallet.findByIdAndUpdate(
            transaction.to,
            {
                $inc: { balance: transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
    } else if (transaction.type === TransactionType.SEND) {
        updatedWallet = await Wallet.findByIdAndUpdate(
            transaction.from,
            {
                $inc: { balance: -transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
        updatedReceiverWallet = await Wallet.findByIdAndUpdate(
            transaction.to,
            {
                $inc: { balance: transaction.amount },
                $push: { transactionHistory: transaction._id },
            },
            { new: true }
        );
    }

    return { transaction, updatedWallet, updatedReceiverWallet };
};

const transactionServices = {
    getMyTransactionService,
    createTransactionService,
    getAllTransactionService,
};

export default transactionServices;
