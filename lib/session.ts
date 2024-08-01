import "server-only";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth";
import { cache } from "react";
import { redirect } from "next/navigation";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  // console.log(session);

  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
};

export async function setSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
