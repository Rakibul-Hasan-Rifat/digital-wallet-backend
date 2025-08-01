import { Schema } from "mongoose";

interface IWallet {
  _id?: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  balance?: number;
  isBlocked?: boolean;
  transactionHistory?: Schema.Types.ObjectId[];
}

export default IWallet;