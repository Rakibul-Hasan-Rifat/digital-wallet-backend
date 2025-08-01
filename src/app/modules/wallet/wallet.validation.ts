import z from "zod";

export const walletZodSchemaToCreate = z.object({
  owner: z.string(),
  balance: z.number().optional(),
  isBlocked: z.boolean().optional(),
  transactionHistory: z.array(z.string()).optional(),
});

export const walletZodSchemaToAddMoney = z.object({
  amount: z.number(),
})

export const walletZodSchemaToUpdate = z.object({
  balance: z.number().optional(),
  isBlokced: z.boolean().optional(),
});
