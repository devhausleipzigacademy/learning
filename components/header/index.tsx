import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser } from '@/lib/session';
import {
  Calendar,
  LayoutDashboard,
  Lightbulb,
  Loader2Icon,
  File,
  Ticket,
  TicketPlusIcon,
  NewspaperIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, cache } from 'react';
import { LogoutItem } from './logout-item';
import { MenuButton } from './menu-button';
import { ModeToggle } from './mode-toggle';
import { userRepository } from '@/repositories/user.repository';

const profilerLoader = cache(userRepository.getUserById);

export async function Header() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link href="/" className="flex gap-2 items-center text-xl">
            <Lightbulb />
            <div className="hidden md:block">APP</div>
          </Link>

          <div className="flex items-center gap-2">
            {!isSignedIn ? (
              <Button
                variant={'link'}
                asChild
                className="flex items-center justify-center gap-2"
              >
                <Link href={'/request-invite'}>
                  <TicketPlusIcon className="w-4 h-4" /> Request invite
                </Link>
              </Button>
            ) : null}
            <Button
              variant={'link'}
              asChild
              className="flex items-center justify-center gap-2"
            >
              <Link href={'/blog'}>
                <NewspaperIcon className="w-4 h-4" /> Blog
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-40">
                <Loader2Icon className="animate-spin w-4 h-4" />
              </div>
            }
          >
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProfileAvatar({ userId }: { userId: string }) {
  const profile = await profilerLoader(userId);

  return (
    <Avatar>
      <AvatarImage src={profile?.avatarUrl} />
      <AvatarFallback>
        {profile?.name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </AvatarFallback>
    </Avatar>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <ProfileDropdown userId={user.id} />
          <div className="md:hidden">
            <MenuButton />
          </div>
        </>
      ) : (
        <>
          <ModeToggle />

          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </>
  );
}
async function ProfileDropdown({ userId }: { userId: string }) {
  const profile = await profilerLoader(userId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:ring-2 ring-offset-2 ring-purple-500 rounded-full">
        <Suspense
          fallback={
            <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
              ..
            </div>
          }
        >
          <ProfileAvatar userId={userId} />
        </Suspense>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="space-y-2 w-52" align="end">
        <DropdownMenuLabel>{profile?.username}</DropdownMenuLabel>
        {profile?.role === 'admin' ? (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/invites"
                className="flex gap-2 items-center cursor-pointer"
              >
                <Ticket className="size-4" />
                Invites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex gap-2 items-center cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex gap-2 items-center cursor-pointer"
          >
            <Calendar className="w-4 h-4" /> Schedule
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex gap-2 items-center cursor-pointer"
          >
            <File className="w-4 h-4" /> Content
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
