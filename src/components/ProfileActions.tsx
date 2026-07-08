"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

const DEMO_AUTH_KEY = "promptpin-demo-auth";

export function ProfileActions() {
  function signOut() {
    window.localStorage.removeItem(DEMO_AUTH_KEY);
    window.location.href = "/";
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        className="inline-flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-4 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
        href="/settings"
      >
        <Settings className="h-4 w-4" />
        Edit profile
      </Link>
      <button
        className="inline-flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-4 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
        onClick={signOut}
        type="button"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}
