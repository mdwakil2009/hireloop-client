import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BadgeCheck, ShieldCheck } from "lucide-react"

import { Toaster } from "@/components/ui/toast"
import { PayButton } from "@/app/components/PayButton"

export const metadata: Metadata = {
  title: "Payment | Hireloop",
  description: "Upgrade to Premium to keep applying for jobs.",
}

// Price shown on the checkout — change here when the plan changes
const PLAN_NAME = "Premium"
const PLAN_PRICE = 20
const PLAN_FEATURES = [
  "Unlimited job applications",
  "Priority application visibility",
  "Premium job insights",
]

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <main className="min-h-svh bg-gray-50 px-4 py-8 text-gray-900 md:py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Back link */}
        <Link
          href="/browse-jobs"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Browse Jobs
        </Link>

        {/* Checkout card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {/* Heading */}
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <BadgeCheck className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Upgrade to {PLAN_NAME}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                You&apos;ve reached the free application limit. Upgrade to keep
                applying for jobs.
              </p>
            </div>
          </div>

          {/* Payment information */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase">
              Payment Information
            </h2>

            <div className="mt-3 flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-gray-900">
                  {PLAN_NAME} (Job Seeker)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Billing</span>
                <span className="font-semibold text-gray-900">Monthly</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Renews</span>
                <span className="font-semibold text-gray-900">
                  Cancel anytime
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <BadgeCheck className="size-4 shrink-0 text-violet-600" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-sm font-medium text-gray-600">
                Total due today
              </span>
              <span className="text-xl font-bold text-gray-900">
                ${PLAN_PRICE.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Pay button (Stripe checkout comes here later) */}
          <div className="mt-5 flex justify-center">
            <form
              action="/api/checkout_sessions"
              method="POST"
              className="w-full"
            >
              <section className="w-full">
                <button  role="link" className="w-full">
                  <PayButton amount={PLAN_PRICE} label="Checkout" />
                </button>
              </section>
            </form>
          </div>

          {/* Security note */}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Secure checkout — Powered by Stripe
          </p>
        </div>

        {/* Toast host — the dashboard layout's Toaster doesn't cover this route */}
        <Toaster />
      </div>
    </main>
  )
}
