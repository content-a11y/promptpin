import { AppHeader } from "@/components/AppHeader";
import { CopyPromptButton } from "@/components/CopyPromptButton";
import { PromptActions } from "@/components/PromptActions";
import { PromptCard } from "@/components/PromptCard";
import { getPromptBySlug, getRelatedPrompts, prompts } from "@/lib/prompts";
import { ArrowLeft, BadgeCheck, Play } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type PromptPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export async function generateMetadata({ params }: PromptPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  return {
    title: prompt ? `${prompt.title} | PromptPin` : "Prompt not found",
    description: prompt?.description,
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const fullPrompt = [
    `Subject: ${prompt.structuredPrompt.subject}`,
    `Style: ${prompt.structuredPrompt.style}`,
    `Composition: ${prompt.structuredPrompt.composition}`,
    `Lighting: ${prompt.structuredPrompt.lighting}`,
    `Details: ${prompt.structuredPrompt.details}`,
    `Negative: ${prompt.structuredPrompt.negative}`,
  ].join("\n");

  const relatedPrompts = getRelatedPrompts(prompt);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>

        <section className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <div className="relative">
              <img src={prompt.imageUrl} alt={prompt.title} className="h-full w-full object-cover" />
              {prompt.mediaType === "video" ? (
                <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-zinc-950/85 px-4 py-2 text-sm font-semibold text-white">
                  <Play className="h-4 w-4 fill-current" />
                  Video prompt
                </span>
              ) : null}
            </div>
          </div>

          <aside className="space-y-5">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  {prompt.category}
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                  {prompt.model}
                </span>
                {prompt.visibility === "member" ? (
                  <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">
                    Member
                  </span>
                ) : null}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">{prompt.title}</h1>
              <p className="mt-3 leading-7 text-zinc-600">{prompt.description}</p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
                {prompt.creator.avatar}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1 font-semibold text-zinc-950">
                  {prompt.creator.name}
                  <BadgeCheck className="h-4 w-4 text-red-600" />
                </p>
                <p className="text-sm text-zinc-500">
                  {prompt.creator.handle} · {prompt.creator.role}
                </p>
              </div>
            </div>

            <PromptActions title={prompt.title} />

            <div className="rounded-lg border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-zinc-950">Structured prompt</h2>
                <CopyPromptButton promptText={fullPrompt} />
              </div>
              <dl className="mt-5 space-y-4">
                {Object.entries(prompt.structuredPrompt).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-zinc-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span
                  className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600"
                  key={tag}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section className="py-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-zinc-950">
            Relevant prompts
          </h2>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
            {relatedPrompts.map((relatedPrompt) => (
              <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
