import { model, Schema } from "mongoose";
import IWallet from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
    _id: { type: Schema.Types.ObjectId, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  balance: { type: Number, default: 50 },
  isBlocked: { type: Boolean, default: false },
  transactionHistory: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
}, {
    timestamps: true,
    versionKey: false,
})

const Wallet = model("Wallet", walletSchema);

export default Wallet;