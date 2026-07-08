import { AppHeader } from "@/components/AppHeader";
import { CreatorPostForm } from "@/components/CreatorPostForm";
import { RoleGate } from "@/components/RoleGate";

export default function CreatePage() {
  return (
    <>
      <AppHeader />
      <RoleGate allowedRoles={["super_admin"]} label="Super admin posting">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Super admin posting
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
              Add a new prompt spot.
            </h1>
            <p className="mt-3 leading-7 text-zinc-600">
              Upload media, write the structured prompt, choose visibility, and publish.
            </p>
          </div>
          <CreatorPostForm />
        </main>
      </RoleGate>
    </>
  );
}
