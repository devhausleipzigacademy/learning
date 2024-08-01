import { createSession } from "@/lib/auth";
import { authRepository } from "@/repositories/auth.repository";
import { userRepository } from "@/repositories/user.repository";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (!code) {
    return Response.json({ error: "No code provided" }, { status: 401 });
  }

  const existingInvite = await authRepository.getInviteById(code);
  if (!existingInvite) {
    return Response.json({ error: "Invalid invite" }, { status: 401 });
  }
  const existingUser = await userRepository.getUserByEmail(
    existingInvite.email
  );
  if (existingUser) {
    return Response.json({ error: "User already registered" }, { status: 404 });
  }

  const newUser = await userRepository.createUser({
    email: existingInvite.email,
    firstName: existingInvite.firstName,
    lastName: existingInvite.lastName,
  });
  await authRepository.removeInvite(existingInvite.id);
  createSession(newUser.id);
  redirect("/dashboard");
}
