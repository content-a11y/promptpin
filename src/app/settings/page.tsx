import { AppHeader } from "@/components/AppHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, LockKeyhole, Mail, UserRound } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
        <section className="mb-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Account settings</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Manage your profile, login details, and prompt preferences.
          </p>
        </section>

        <div className="space-y-4">
          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <UserRound className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-zinc-950">Profile</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-950">Name</span>
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-zinc-500"
                  defaultValue="Content"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-zinc-950">Username</span>
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-zinc-500"
                  defaultValue="@content"
                />
              </label>
            </div>
          </section>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-zinc-950">Login</h2>
            </div>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-950">Email</span>
              <input
                className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-zinc-500"
                defaultValue="content@npl.live"
              />
            </label>
          </section>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <Bell className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-zinc-950">Preferences</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input className="mt-1" defaultChecked type="checkbox" />
                <span>
                  <span className="font-semibold text-zinc-950">Prompt recommendations</span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    Show more prompts based on your liked and saved items.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input className="mt-1" type="checkbox" />
                <span>
                  <span className="font-semibold text-zinc-950">Private profile</span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    Hide public collection activity from other users.
                  </span>
                </span>
              </label>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-4">
                <div>
                  <p className="font-semibold text-zinc-950">Dark theme</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Switch the prototype into a darker browsing mode.
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">Security</h2>
                <p className="text-sm text-zinc-500">Password and session settings connect here.</p>
              </div>
            </div>
          </section>

          <button className="h-12 w-full rounded-full bg-zinc-950 text-sm font-semibold text-white hover:bg-zinc-800">
            Save changes
          </button>
        </div>
      </main>
    </>
  );
}
