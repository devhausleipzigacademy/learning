"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import { deleteInvite } from "./actions";
import { toast } from "sonner";

interface Props {
  id: string;
}

export function DeleteItem({ id }: Props) {
  const handleSelect = async () => {
    const [_, err] = await deleteInvite({ id });
    if (err) {
      toast(err.data);
      return;
    }
    toast("Invite successfully deleted");
  };
  return (
    <DropdownMenuItem
      onSelect={handleSelect}
      className="flex items-center gap-2"
    >
      <Trash2Icon className="size-4" />
      Delete
    </DropdownMenuItem>
  );
}
