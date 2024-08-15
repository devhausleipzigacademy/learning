'use server';

import { authRepository } from '@/repositories/auth.repository';
import { userRepository } from '@/repositories/user.repository';
import { InviteInputSchema } from '@/validation/invite';
import {
  InviteAlreadyExistsError,
  UserAlreadyRegisteredError,
} from '@/shared/errors/auth.errors';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const requestInvite = createServerAction()
  .input(InviteInputSchema, {
    type: 'formData',
  })
  .output(z.void())
  .handler(async ({ input }) => {
    const existingUser = await userRepository.getUserByEmail(input.email);
    const existingInvite = await authRepository.getInviteByEmail(input.email);

    if (existingUser) {
      throw 'You are already registered on the platform';
    }

    if (existingInvite) {
      throw 'You were already invited to the platform';
    }

    await authRepository.createInvite(input);
    return redirect('/invite-pending');
  });
