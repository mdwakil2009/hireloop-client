"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import logoUrl from "@/app/images/logo.png";
import { signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const fieldClasses =
  "h-12 w-full rounded-xl border border-white/20 bg-[#101010] px-4 text-base text-white outline-none transition-colors placeholder:text-white/50 hover:border-white/30 focus:border-[#5C53FE] focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

const roles = [
  { value: "seeker", label: "Job Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const;

type Role = (typeof roles)[number]["value"];
type Status = "idle" | "loading" | "error" | "success";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("seeker");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      terms: string;
    };

    if (data.password !== data.confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    // Server config: user role comes from lib/auth.ts (additionalFields).
    const { data: user, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role,
    });
    router.refresh()
    router.push("/")
    if (error) {
      setStatus("error");
      setMessage(error.message ?? "Could not create the account. Please try again.");
      return;
    }

    setStatus("success");
    console.log("[sign-up] account created:", user);
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

        {status === "success" ? (
          <div className="mt-8 flex flex-col items-center gap-2 rounded-xl bg-[#131316] p-6 ring-1 ring-white/10">
            <p className="text-center font-manrope text-lg text-white font-semibold">
              Account created!
            </p>
            <p className="text-center font-manrope text-sm text-white/70">
              You can now sign in and start exploring jobs.
            </p>
            <Link
              href="/sign-in"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-[#5C53FE] px-6 text-base text-white font-medium transition-all outline-none hover:bg-[#5C53FE]/85 active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Go to Sign In
            </Link>
          </div>
        ) : (
          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Role */}
            <fieldset className="flex flex-col gap-1.5">
              <legend className="font-manrope text-sm text-white/90">I am a</legend>
              <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/20 bg-[#101010] p-1">
                {roles.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex h-10 cursor-pointer items-center justify-center rounded-lg text-center text-sm transition-colors select-none",
                      role === option.value
                        ? "bg-[#5C53FE] text-white font-medium"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(e) => setRole(e.target.value as Role)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

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
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-0.5 size-4 flex-shrink-0 accent-[#5C53FE]"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#5C53FE] transition-colors hover:text-[#5C53FE]/80"
                >
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

            {status === "error" && message && (
              <p className="text-center font-manrope text-sm text-red-400" role="alert">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#5C53FE] text-base text-white font-medium transition-all outline-none hover:bg-[#5C53FE]/85 active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" && <Loader2 className="size-4 animate-spin" />}
              {status === "loading" ? "Creating account…" : "Create Account"}
            </button>
          </form>
        )}
      </div>

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
