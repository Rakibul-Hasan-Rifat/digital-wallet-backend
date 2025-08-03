import { model, Schema } from "mongoose";
import IWallet from "./wallet.interface";

const walletSchema = new Schema<IWallet>(
  {
    owner: { type: String, required: true, ref: "User" },
    balance: { type: Number, default: 50 },
    isBlocked: { type: Boolean, default: false },
    transactionHistory: [
      { type: String, ref: "Transaction", default: [] },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Wallet = model("Wallet", walletSchema);

export default Wallet;
