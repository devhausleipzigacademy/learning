"use server";

import { EmailTemplate } from "@/components/emails/invite-template";
import { authRepository } from "@/repositories/auth.repository";
import { emailRepository } from "@/repositories/email.repository";
import { userRepository } from "@/repositories/user.repository";
import { InviteInputSchema } from "@/schemas/invite";
import { z } from "zod";
import { createServerAction } from "zsa";

export const invite = createServerAction()
  .input(InviteInputSchema, {
    type: "formData",
  })
  .output(z.void())
  .handler(async ({ input }) => {
    const existingInvite = await authRepository.getInviteByEmail(input.email);
    if (existingInvite) throw "Invite already exists";
    const existingUser = await userRepository.getUserByEmail(input.email);
    if (existingUser) throw "User already registered";
    const newInvite = await authRepository.createInvite({
      ...input,
      status: "pending",
    });

    await emailRepository.sendEmail({
      to: input.email,
      subject: "Devhaus Invitation",
      template: EmailTemplate({
        firstName: input.firstName,
        url: `http://localhost:3000/api/accept?code=${newInvite.id}`,
      }),
    });
  });
