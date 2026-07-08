import { AppHeader } from "@/components/AppHeader";
import { CreatorPostForm } from "@/components/CreatorPostForm";

export default function CreatePage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Internal posting tool
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
            Add a new prompt spot.
          </h1>
          <p className="mt-3 leading-7 text-zinc-600">
            This is an internal-only tool for uploading media, writing the structured prompt,
            choosing visibility, and publishing to Supabase.
          </p>
        </div>
        <CreatorPostForm />
      </main>
    </>
  );
}
