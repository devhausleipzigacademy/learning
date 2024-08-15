'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CircleOffIcon } from 'lucide-react';
import { toast } from 'sonner';
import { rejectInvite } from './actions';

interface Props {
  id: string;
}

export function RejectItem({ id }: Props) {
  const handleSelect = async () => {
    const [_, err] = await rejectInvite({ id });
    if (err) {
      toast(err.data);
      return;
    }
    toast('Invite rejected');
  };
  return (
    <DropdownMenuItem
      onSelect={handleSelect}
      className="flex items-center gap-2"
    >
      <CircleOffIcon className="size-4" /> Reject
    </DropdownMenuItem>
  );
}
