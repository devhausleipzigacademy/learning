'use server';

import { authRepository } from '@/repositories/auth.repository';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import { EmailTemplate } from '@/components/emails/invite-template';
import { emailRepository } from '@/repositories/email.repository';
import { userRepository } from '@/repositories/user.repository';
import { InviteInputSchema } from '@/validation/invite';

const sendInvite = async ({
  email,
  firstName,
  id,
}: {
  email: string;
  firstName: string;
  id: string;
}) => {
  await emailRepository.sendEmail({
    to: email,
    subject: 'Devhaus Invitation',
    template: EmailTemplate({
      firstName: firstName,
      url: `http://localhost:3000/api/accept?code=${id}`,
    }),
  });
};

export const acceptInvite = createServerAction()
  .input(
    z.object({
      id: z.string().nanoid(),
    }),
  )
  .handler(async ({ input }) => {
    const invite = await authRepository.getInviteById(input.id);
    if (!invite) throw 'Invite not found';
    await authRepository.updateInvite(invite.id, { status: 'pending' });
    await sendInvite({
      email: invite.email,
      firstName: invite.firstName,
      id: input.id,
    });
    revalidatePath('/admin/invites');
  });

export const rejectInvite = createServerAction()
  .input(
    z.object({
      id: z.string().nanoid(),
    }),
  )
  .handler(async ({ input }) => {
    const invite = await authRepository.getInviteById(input.id);
    if (!invite) throw 'Invite not found';
    await authRepository.updateInvite(invite.id, { status: 'rejected' });
    // await sendInvite({
    //   email: invite.email,
    //   firstName: invite.firstName,
    //   id: input.id,
    // });
    revalidatePath('/admin/invites');
  });

export const resendInvite = createServerAction()
  .input(
    z.object({
      id: z.string().nanoid(),
    }),
  )
  .handler(async ({ input }) => {
    const invite = await authRepository.getInviteById(input.id);
    if (!invite) throw 'Invite not found';
    await sendInvite({
      email: invite.email,
      firstName: invite.firstName,
      id: input.id,
    });
  });

export const createInvite = createServerAction()
  .input(InviteInputSchema, {
    type: 'formData',
  })
  .output(z.void())
  .handler(async ({ input }) => {
    const existingInvite = await authRepository.getInviteByEmail(input.email);
    if (existingInvite) throw 'Invite already exists';
    const existingUser = await userRepository.getUserByEmail(input.email);
    if (existingUser) throw 'User already registered';
    const newInvite = await authRepository.createInvite({
      ...input,
      status: 'pending',
    });

    revalidatePath('/admin/invites');

    await sendInvite({
      email: input.email,
      firstName: input.firstName,
      id: newInvite.id,
    });
  });

export const deleteInvite = createServerAction()
  .input(
    z.object({
      id: z.string().nanoid(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await authRepository.removeInvite(input.id);
      revalidatePath('/admin/invites');
    } catch (error) {
      throw 'Failed to delete invite';
    }
  });
