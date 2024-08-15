import { github, lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import {
  InviteNotApprovedError,
  NoInviteError,
} from '@/shared/errors/auth.errors';
import { authRepository } from '@/repositories/auth.repository';
import { userRepository } from '@/repositories/user.repository';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await userRepository.getUserByGithubId(githubUser.id);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    const existingInvite = await authRepository.getInviteByEmail(
      githubUser.email,
    );

    if (!existingInvite) {
      throw new NoInviteError();
    }

    if (existingInvite.status === 'requested') {
      throw new InviteNotApprovedError();
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    await userRepository.createUser({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
      email: githubUser.email,
    });

    await authRepository.removeInvite(existingInvite.id);

    await authRepository.removeInviteByEmail(githubUser.email);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard',
      },
    });
  } catch (e) {
    if (e instanceof NoInviteError) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/request-invite',
        },
      });
    }

    if (e instanceof InviteNotApprovedError) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/invite-pending',
        },
      });
    }
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  email: string;
  name: string;
}
