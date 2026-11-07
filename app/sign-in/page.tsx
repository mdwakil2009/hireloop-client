import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In | Hireloop",
  description: "Sign in to your Hireloop account to apply for jobs and track applications.",
};

export default function SignInPage() {
  return (
    <main className="relative flex min-h-[calc(100svh-80px)] items-center justify-center overflow-hidden bg-[#010103] px-4 py-12 md:py-16">
      {/* Subtle magenta glow at the top, echoing the homepage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(120%_90%_at_50%_-35%,#DC02CE_0%,rgba(220,2,206,0.4)_22%,rgba(220,2,206,0.12)_45%,transparent_70%)]"
      />
      <div className="relative z-10 w-fit">
        <SignInForm />
      </div>
    </main>
  );
}
