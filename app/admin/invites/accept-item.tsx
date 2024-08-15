'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CircleCheckBigIcon } from 'lucide-react';
import { toast } from 'sonner';
import { acceptInvite } from './actions';

interface Props {
  id: string;
}

export function AcceptItem({ id }: Props) {
  const handleSelect = async () => {
    const [_, err] = await acceptInvite({ id });
    if (err) {
      toast(err.data);
      return;
    }
    toast('Invite approved');
  };
  return (
    <DropdownMenuItem
      onSelect={handleSelect}
      className="flex items-center gap-2"
    >
      <CircleCheckBigIcon className="size-4" /> Approve
    </DropdownMenuItem>
  );
}
