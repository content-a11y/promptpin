import { AppHeader } from "@/components/AppHeader";
import { CopyPromptButton } from "@/components/CopyPromptButton";
import { PromptActions } from "@/components/PromptActions";
import { PromptCard } from "@/components/PromptCard";
import { getPromptBySlug, getRelatedPrompts, prompts } from "@/lib/prompts";
import {
  ArrowLeft,
  BadgeCheck,
  Ban,
  Box,
  Layers3,
  Palette,
  Play,
  Sparkles,
  SunMedium,
} from "lucide-react";
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
  const sideRailPrompts = prompts
    .filter((candidate) => candidate.id !== prompt.id)
    .sort((a, b) => {
      const aRelated = relatedPrompts.some((relatedPrompt) => relatedPrompt.id === a.id) ? 1 : 0;
      const bRelated = relatedPrompts.some((relatedPrompt) => relatedPrompt.id === b.id) ? 1 : 0;

      return bRelated - aRelated || b.likes - a.likes;
    })
    .slice(0, 8);
  const promptSections = [
    {
      key: "subject",
      label: "Subject",
      Icon: Box,
      accent: "text-blue-700",
      chip: "bg-blue-50",
      panel: "bg-blue-50/70",
      border: "border-blue-100",
    },
    {
      key: "style",
      label: "Style",
      Icon: Palette,
      accent: "text-fuchsia-700",
      chip: "bg-fuchsia-50",
      panel: "bg-fuchsia-50/70",
      border: "border-fuchsia-100",
    },
    {
      key: "composition",
      label: "Composition",
      Icon: Layers3,
      accent: "text-emerald-700",
      chip: "bg-emerald-50",
      panel: "bg-emerald-50/70",
      border: "border-emerald-100",
    },
    {
      key: "lighting",
      label: "Lighting",
      Icon: SunMedium,
      accent: "text-amber-700",
      chip: "bg-amber-50",
      panel: "bg-amber-50/70",
      border: "border-amber-100",
    },
    {
      key: "details",
      label: "Details",
      Icon: Sparkles,
      accent: "text-violet-700",
      chip: "bg-violet-50",
      panel: "bg-violet-50/70",
      border: "border-violet-100",
    },
    {
      key: "negative",
      label: "Negative",
      Icon: Ban,
      accent: "text-rose-700",
      chip: "bg-rose-50",
      panel: "bg-rose-50/70",
      border: "border-rose-100",
    },
  ] as const;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-[1800px] px-3 pb-10 pt-3 sm:px-5">
        <section className="grid gap-4 xl:grid-cols-[minmax(420px,0.95fr)_minmax(360px,520px)_360px]">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-100 xl:sticky xl:top-[68px] xl:h-[calc(100vh-88px)]">
            <Link
              className="absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-sm backdrop-blur hover:bg-white"
              href="/"
              aria-label="Back to feed"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="relative h-full min-h-[520px]">
              <img
                src={prompt.imageUrl}
                alt={prompt.title}
                className="h-full w-full object-cover"
              />
              {prompt.mediaType === "video" ? (
                <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-zinc-950/85 px-4 py-2 text-sm font-semibold text-white">
                  <Play className="h-4 w-4 fill-current" />
                  Video prompt
                </span>
              ) : null}
            </div>
          </div>

          <aside className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-4 xl:min-h-[calc(100vh-88px)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800">
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
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">{prompt.title}</h1>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{prompt.description}</p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
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

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-zinc-950">Structured prompt</h2>
                <CopyPromptButton promptText={fullPrompt} />
              </div>
              <dl className="mt-5 space-y-4">
                {promptSections.map(({ key, label, Icon, accent, chip, panel, border }) => (
                  <div key={key}>
                    <dt className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${accent}`}>
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${chip}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </dt>
                    <dd className={`mt-2 rounded-xl border p-3 text-sm leading-6 text-zinc-800 ${panel} ${border}`}>
                      {prompt.structuredPrompt[key]}
                    </dd>
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

          <aside className="hidden xl:block">
            <h2 className="mb-3 px-1 text-sm font-semibold tracking-tight text-zinc-950">
              Ideas you might love
            </h2>
            <div className="columns-2 gap-3">
              {sideRailPrompts.map((relatedPrompt) => (
                <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} />
              ))}
            </div>
          </aside>
        </section>

        <section className="py-8 xl:hidden">
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-950">
            Ideas you might love
          </h2>
          <div className="columns-1 gap-3 sm:columns-2 lg:columns-4">
            {relatedPrompts.map((relatedPrompt) => (
              <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
