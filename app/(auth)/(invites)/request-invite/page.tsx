import Link from "next/link";
import { RequestInviteForm } from "./request-invite-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Request Invite</h1>
            <p className="text-balance text-muted-foreground">
              Enter the email of the user you want to invite below
            </p>
          </div>
          <RequestInviteForm />
          <p className="text-muted-foreground text-sm flex gap-1">
            Already have an account?
            <Link href="/login" className="underline">
              Login to your account
            </Link>
          </p>
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
