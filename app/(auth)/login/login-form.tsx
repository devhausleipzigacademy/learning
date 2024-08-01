"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerAction } from "zsa-react";
import { login } from "./actions";

export function LoginForm() {
  // const [state, formAction] = useFormState(login, null);
  const { executeFormAction, isSuccess, isError, isPending, error, data } =
    useServerAction(login);
  return (
    <form className="grid gap-4" action={executeFormAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="me@example.com"
          autoComplete="email"
        />
        {isError ? (
          <p className="text-red-500 text-xs -mt-1 pl-1">
            {error.fieldErrors?.email}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={isPending}>
        Login
      </Button>
      {/* {error?.data ? (
        <p className="text-red-500 text-xs -mt-1 pl-1">{error.data}</p>
      ) : null} */}
      {/* <SubmitButton>Login</SubmitButton> */}
    </form>
  );
}
