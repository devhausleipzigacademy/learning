"use client";

import { useServerAction } from "zsa-react";
import { invite } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InviteForm() {
  const { executeFormAction, isPending, error } = useServerAction(invite);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <form className="grid gap-4" action={executeFormAction}>
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
