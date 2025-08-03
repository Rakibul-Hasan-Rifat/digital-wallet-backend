import { model, Schema } from "mongoose";
import Transaction, { TransactionType } from "./transaction.interface";

const transactionSchema = new Schema<Transaction>(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(TransactionType),
    },
    from: { type: String, ref: "Wallet" }, // null for top-up/cash-in
    to: { type: String, ref: "Wallet" },
    initiator: { type: String, ref: "User" }, // user or agent who triggered it
    amount: {type: Number, required: true},
    receiverEmail: {type: String}
  },
  { timestamps: true, versionKey: false }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
