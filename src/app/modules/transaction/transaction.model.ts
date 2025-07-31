import { model, Schema } from "mongoose";

const transactionSchema = new Schema({
  type: {
    type: String,
    enum: ["topup", "withdraw", "send", "cashin", "cashout"],
  },
  from: { type: Schema.Types.ObjectId, ref: "Wallet" }, // null for top-up/cash-in
  to: { type: Schema.Types.ObjectId, ref: "Wallet" },
  initiator: { type: Schema.Types.ObjectId, ref: "User" }, // user or agent who triggered it
  amount: Number,
  fee: Number,
  commission: Number,
  status: {
    type: String,
    enum: ["pending", "completed", "reversed"],
    default: "completed",
  }
}, {timestamps: true, versionKey: false});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
