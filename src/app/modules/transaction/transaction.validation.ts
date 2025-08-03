import z from "zod";
import { TransactionType } from "./transaction.interface";

export const transactionZodSchemaToCreate = z.object({
    type: z.enum(Object.values(TransactionType)),
    from: z.string().optional(),
    to: z.string().optional(),
    initiator: z.string().optional(),
    amount: z.number(),
    receiverEmail: z.email().optional()
})

export const transactionZodSchemaToUpdate = z.object({
    type: z.enum(Object.values(TransactionType)).optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    initiator: z.string().optional(),
    amount: z.number()
})