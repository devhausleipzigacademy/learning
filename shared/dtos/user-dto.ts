import { z } from 'zod';
import { role } from '@/repositories/schemas/user';

export const UserDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  avatarUrl: z.string(),
  role: z.enum(role.enumValues),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;
