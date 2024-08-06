"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
      <p className="text-lg max-w-xl bg-red-500/20 border-2 rounded-md p-4 border-red-500">
        {JSON.stringify(error.message, null, 2)}
      </p>
    </div>
  );
}
