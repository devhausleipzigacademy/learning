"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SendHorizonalIcon } from "lucide-react";
import { toast } from "sonner";
import { resendInvite } from "./actions";

interface Props {
  id: string;
}

export function ResendItem({ id }: Props) {
  const handleSelect = async () => {
    const [_, err] = await resendInvite({ id });
    if (err) {
      toast(err.data);
      return;
    }
    toast("Invite sent again");
  };
  return (
    <DropdownMenuItem
      onSelect={handleSelect}
      className="flex items-center gap-2"
    >
      <SendHorizonalIcon className="size-4" /> Resend
    </DropdownMenuItem>
  );
}
