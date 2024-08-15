import { role } from '@/repositories/schemas/user';
import { z } from 'zod';

export const InviteInputSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  firstName: z.string().min(1, 'First name is required'),
  role: z.enum(role.enumValues),
});
