// {
//   type: {
//     type: String,
//     enum: ['topup', 'withdraw', 'send', 'cashin', 'cashout'],
//   },
//   from: { type: Schema.Types.ObjectId, ref: 'Wallet' }, // null for top-up/cash-in
//   to: { type: Schema.Types.ObjectId, ref: 'Wallet' },
//   initiator: { type: Schema.Types.ObjectId, ref: 'User' }, // user or agent who triggered it
//   amount: Number,
//   fee: Number,
//   commission: Number,
//   status: { type: String, enum: ['pending', 'completed', 'reversed'], default: 'completed' },
//   createdAt: Date
// }

export enum TransactionType {
  SEND = "SEND",
  TOPUP = "TOPUP",
  CASHIN = "CASHIN",
  CASHOUT = "CASHOUT",
  WITHDRAW = "WITHDRAW",
}

interface ITransaction {
  type: TransactionType;
  amount: number;
  to?: string | null;
  from?: string | null;
  initiator?: string;
  receiverEmail?: string;
}

export default ITransaction;
