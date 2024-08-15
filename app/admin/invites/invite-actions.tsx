import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVerticalIcon, SendHorizonalIcon } from 'lucide-react';
import { DeleteItem } from './delete-item';
import { ResendItem } from './resend-item';
import { InviteDTO } from '@/shared/dtos/invite-dto';
import { AcceptItem } from './accept-item';
import { RejectItem } from './reject-item';
import { AlertDialog } from '@/components/ui/alert-dialog';

interface Props {
  invite: InviteDTO;
}

export function InviteActions({ invite }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <MoreVerticalIcon className="h-3.5 w-3.5" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {invite.status === 'requested' ? (
          <>
            <AcceptItem id={invite.id} />
            <RejectItem id={invite.id} />
            <DropdownMenuSeparator />
          </>
        ) : null}
        {invite.status === 'pending' ? (
          <>
            <ResendItem id={invite.id} />
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DeleteItem id={invite.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
