'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { InviteForm } from './invite-form';

export function InviteDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-end gap-2" size="sm">
          <PlusCircleIcon className="size-4" /> Create Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invite</DialogTitle>
          <DialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus blanditiis animi aspernatur?
          </DialogDescription>
          <div className="py-4">
            <InviteForm setOpen={setOpen} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
