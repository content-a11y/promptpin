"use client";

import { DEMO_AUTH_EVENT, DEMO_USER_KEY, type DemoAccount } from "@/lib/demoAccounts";
import { Link as LinkIcon, Mail } from "lucide-react";
import { useSyncExternalStore } from "react";

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

function getRoleLabel(role: DemoAccount["role"]) {
  if (role === "super_admin") {
    return "super admin";
  }

  if (role === "admin") {
    return "admin";
  }

  return "member";
}

export function ProfileIdentity() {
  const userJson = useSyncExternalStore(subscribeToDemoAuth, getUserSnapshot, getServerSnapshot);
  const user = userJson
    ? (JSON.parse(userJson) as DemoAccount)
    : {
        email: "content@npl.live",
        name: "Content",
        handle: "@content",
        role: "viewer" as const,
      };
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-950 text-3xl font-bold text-white">
        {initial}
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">{user.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">{user.handle}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-600">
          <span className="inline-flex items-center gap-1.5">
            <Mail className="h-4 w-4" />
            {user.email}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LinkIcon className="h-4 w-4" />
            {getRoleLabel(user.role)}
          </span>
        </div>
      </div>
    </div>
  );
}
