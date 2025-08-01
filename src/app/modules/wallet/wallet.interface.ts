// {
//   owner: { type: Schema.Types.ObjectId, ref: 'User' },
//   balance: { type: Number, default: 50 },
//   isBlocked: { type: Boolean, default: false },
//   walletId: { type: String, unique: true },
//   transactionHistory: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
//   createdAt: Date,
//   updatedAt: Date
// }

import { Types } from "mongoose";

interface IWallet {
    _id: Types.ObjectId
    owner: Types.ObjectId
    balance: number
    isBlocked: boolean
    transactionHistory: Types.ObjectId[]
}

export default IWallet;