"use client";

import { useServerAction } from "zsa-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInvite } from "./actions";
import { toast } from "sonner";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InviteForm({ setOpen }: Props) {
  const { execute, error, isPending } = useServerAction(createInvite);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [_, err] = await execute(formData);
    if (err) {
      toast(err.data);
    }
    toast("Successfuly created invite");
    setOpen(false);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="new-user@example.com"
          autoComplete="email"
        />
        {error?.fieldErrors?.email ? (
          <p className="text-red-500 text-xs -mt-1 pl-1">
            {error.fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Your first name"
          autoComplete="given-name"
        />
        {error?.fieldErrors?.firstName ? (
          <p className="text-red-500 text-xs -mt-1 pl-1">
            {error.fieldErrors.firstName}
          </p>
        ) : null}
      </div>
      <Select defaultValue="user" name="role">
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="instructor">Instructor</SelectItem>
          <SelectItem value="staff">Staff</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" disabled={isPending}>
        Invite
      </Button>
      {error && !error?.fieldErrors ? (
        <p className="text-red-500 text-xs -mt-1 pl-1">{error.data}</p>
      ) : null}
      {/* <SubmitButton>Login</SubmitButton> */}
    </form>
  );
}
