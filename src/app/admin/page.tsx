import { AppHeader } from "@/components/AppHeader";
import { RoleGate } from "@/components/RoleGate";
import { Database, ExternalLink, ShieldCheck } from "lucide-react";

const tables = [
  "profiles",
  "prompts",
  "prompt_media",
  "likes",
  "collections",
  "collection_items",
];

export default function AdminPage() {
  return (
    <>
      <AppHeader />
      <RoleGate allowedRoles={["super_admin"]} label="Super admin">
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Internal super admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
            Manage content and users.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
            Review prompt records, uploads, roles, and access controls from one place.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <section className="rounded-lg border border-zinc-200 bg-white p-5">
              <Database className="h-6 w-6 text-red-600" />
              <h2 className="mt-4 font-semibold text-zinc-950">Database tables</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {tables.map((table) => (
                  <span
                    className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700"
                    key={table}
                  >
                    {table}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-5">
              <ShieldCheck className="h-6 w-6 text-red-600" />
              <h2 className="mt-4 font-semibold text-zinc-950">Access model</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Viewers browse. Internal posters publish. Super admins manage roles and records.
              </p>
            </section>
          </div>

          <a
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
            href="https://supabase.com/dashboard/projects"
            rel="noreferrer"
            target="_blank"
          >
            Open Supabase dashboard
            <ExternalLink className="h-4 w-4" />
          </a>
        </main>
      </RoleGate>
    </>
  );
}
