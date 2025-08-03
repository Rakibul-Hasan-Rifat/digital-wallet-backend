import { Schema } from "mongoose";

interface IWallet {
  _id?: string;
  owner: string;
  balance: number;
  isBlocked?: boolean;
  transactionHistory?: Schema.Types.ObjectId[];
}

export default IWallet;