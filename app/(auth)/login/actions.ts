"use server";

import { createSession } from "@/lib/auth";
import { userRepository } from "@/repositories/user.repository";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerAction } from "zsa";

export const login = createServerAction()
  .input(
    z.object({
      email: z
        .string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const existingUser = await userRepository.getUserByEmail(input.email);
    if (!existingUser) {
      throw "This email address doesn't have access";
    }

    await createSession(existingUser.id);
    return redirect("/verify-login");
  });
