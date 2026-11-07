"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import logoUrl from "@/app/images/logo.png";
import { cn } from "@/lib/utils";

const fieldClasses =
  "h-12 w-full rounded-xl border border-white/20 bg-[#101010] px-4 text-base text-white outline-none transition-colors placeholder:text-white/50 hover:border-white/30 focus:border-[#5C53FE] focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [captured, setCaptured] = useState<Record<string, string> | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Collect form data — real auth (better-auth signUp) will be wired later.
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    delete data.confirmPassword; // only kept for inline validation later
    setCaptured(data);
    console.log("[sign-up] form data:", data);
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="rounded-[16px] bg-gradient-to-b from-[#131316] to-[#0A0A0B] p-6 ring-1 ring-white/10 sm:p-8">
        <Link href="/" className="mx-auto flex w-fit items-center" aria-label="Hireloop home">
          <Image src={logoUrl} width={114} height={32} alt="Hireloop" className="h-8 w-auto" />
        </Link>

        <h1 className="mt-6 text-center font-manrope text-2xl text-white font-semibold">
          Create a free account
        </h1>
        <p className="mt-2 text-center font-manrope text-base text-white/70">
          Join HireLoop and find your dream job — it takes less than a minute.
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-manrope text-sm text-white/90">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className={fieldClasses}
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-manrope text-sm text-white/90">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              className={fieldClasses}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-manrope text-sm text-white/90">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                placeholder="At least 8 characters"
                className={cn(fieldClasses, "pr-11")}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-0 right-0 flex h-12 w-11 items-center justify-center text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="font-manrope text-sm text-white/90">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              placeholder="Re-enter your password"
              className={fieldClasses}
              autoComplete="new-password"
            />
          </div>

          <label className="flex items-start gap-2 font-manrope text-sm text-white/90 select-none">
            <input type="checkbox" name="terms" required className="mt-0.5 accent-[#5C53FE] size-4" />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-[#5C53FE] transition-colors hover:text-[#5C53FE]/80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#5C53FE] transition-colors hover:text-[#5C53FE]/80"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[#5C53FE] text-base text-white font-medium transition-all outline-none hover:bg-[#5C53FE]/85 active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Create Account
          </button>
        </form>
      </div>

      {captured && (
        <p className="mt-4 text-center font-manrope text-sm text-white/60">
          Form data collected (demo): {JSON.stringify(captured)}
        </p>
      )}

      <p className="mt-6 text-center font-manrope text-base text-white/70">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-[#5C53FE] font-medium transition-colors hover:text-[#5C53FE]/80"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
