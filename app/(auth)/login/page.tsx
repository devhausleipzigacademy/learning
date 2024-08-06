import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Sign in with your Github Account
            </p>
          </div>
          <Button asChild>
            <Link href="/api/auth/login">Login with GitHub</Link>
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/request-invite" className="underline">
              Request invite
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
