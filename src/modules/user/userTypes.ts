import { z as zod } from 'zod';

export const createUserSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

export type CreateUserDTO = zod.infer<typeof createUserSchema>;

export const loginUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

export type LoginUserDTO = zod.infer<typeof loginUserSchema>;
