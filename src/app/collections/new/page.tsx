import { AppHeader } from "@/components/AppHeader";
import { ArrowLeft, LockKeyhole, Plus } from "lucide-react";
import Link from "next/link";

export default function NewCollectionPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
        <Link
          className="mb-5 inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          href="/collections"
        >
          <ArrowLeft className="h-4 w-4" />
          Collections
        </Link>

        <section className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-8">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
            Create collection
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Name a board and choose whether it stays private or can be shared.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-zinc-950" htmlFor="name">
                Collection name
              </label>
              <input
                className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-zinc-500"
                id="name"
                placeholder="Launch inspiration"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-950" htmlFor="description">
                Description
              </label>
              <textarea
                className="mt-2 min-h-28 w-full rounded-2xl border border-zinc-200 p-4 outline-none focus:border-zinc-500"
                id="description"
                placeholder="Prompts for a campaign, brand, project, or mood."
              />
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <label className="flex items-start gap-3">
                <input className="mt-1" defaultChecked type="checkbox" />
                <span>
                  <span className="flex items-center gap-2 font-semibold text-zinc-950">
                    <LockKeyhole className="h-4 w-4" />
                    Keep private
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-zinc-500">
                    You can share the collection later from the collection page.
                  </span>
                </span>
              </label>
            </div>

            <button
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
              type="button"
            >
              <Plus className="h-4 w-4" />
              Create collection
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
