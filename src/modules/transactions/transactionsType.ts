import { z as zod } from 'zod';

export const createTransactionSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  amount: zod.coerce.number().min(1),
  walletId: zod.string().uuid(),
});

export type CreateTransactionDTO = zod.infer<typeof createTransactionSchema>;
