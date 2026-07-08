import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <section className="w-full max-w-[430px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
            P
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Welcome to PromptPin
          </h1>
          <p className="mt-2 text-base text-zinc-700">Log in to discover more prompts.</p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
