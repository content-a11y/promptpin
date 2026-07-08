"use client";

import { DEMO_AUTH_EVENT, DEMO_USER_KEY, type DemoAccount, type DemoRole } from "@/lib/demoAccounts";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { ReactNode, useSyncExternalStore } from "react";

type RoleGateProps = {
  allowedRoles: DemoRole[];
  children: ReactNode;
  label: string;
};

function getUserSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(DEMO_USER_KEY);
}

function getServerSnapshot() {
  return null;
}

function subscribeToDemoAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DEMO_AUTH_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DEMO_AUTH_EVENT, callback);
  };
}

export function RoleGate({ allowedRoles, children, label }: RoleGateProps) {
  const userJson = useSyncExternalStore(subscribeToDemoAuth, getUserSnapshot, getServerSnapshot);
  const user = userJson ? (JSON.parse(userJson) as DemoAccount) : null;
  const canAccess = user && allowedRoles.includes(user.role);

  if (canAccess) {
    return children;
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4 py-12 text-center">
      <section className="rounded-[28px] border border-zinc-200 bg-white p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">
          {label} access required
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Log in with the matching demo account to test this screen.
        </p>
        <Link
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
          href="/login"
        >
          Go to login
        </Link>
      </section>
    </main>
  );
}
