import { redirect } from 'next/navigation';
import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
  }

  return (
    <div>
      <form action={logout}>
        <button>Sign out</button>
      </form>
      <h1>Hi, {user.email}!</h1>
    </div>
  );
}

interface ActionResult {
  error: string;
}

async function logout(): Promise<ActionResult> {
  'use server';
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/login');
}
