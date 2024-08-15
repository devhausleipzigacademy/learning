'use client';

import { logout } from '@/actions/auth';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export function LogoutItem() {
  return (
    <DropdownMenuItem
      asChild
      className="cursor-pointer"
      onSelect={() => logout()}
    >
      <div className="flex items-center">
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </div>
    </DropdownMenuItem>
  );
}
