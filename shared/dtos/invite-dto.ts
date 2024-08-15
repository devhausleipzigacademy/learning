import { z } from 'zod';
import { role } from '@/repositories/schemas/user';
import { inviteStatus } from '@/repositories/schemas/auth';

export const InviteDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  role: z.enum(role.enumValues),
  status: z.enum(inviteStatus.enumValues),
  createdAt: z.date(),
});

export type InviteDTO = z.infer<typeof InviteDTOSchema>;
