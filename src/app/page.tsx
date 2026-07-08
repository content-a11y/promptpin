import { AppHeader } from "@/components/AppHeader";
import { PromptGrid } from "@/components/PromptGrid";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="pt-4">
        <PromptGrid />
      </main>
    </>
  );
}
