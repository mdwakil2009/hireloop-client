import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  CreditCard,
  Mail,
  ReceiptText,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { checkoutVerify } from "@/lib/actions/payment"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Payment Successful | Hireloop",
  description: "Your payment was completed successfully.",
}

// Shared receipt row: label left, value right
function ReceiptRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: typeof CreditCard
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <Icon className="size-4 shrink-0 text-gray-400" />
        {label}
      </span>

      <span
        className={`min-w-0 text-right text-sm font-semibold text-gray-900 ${
          mono ? "break-all font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  )
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  const { status, customer_email, metadata, payment_intent, payment_status } =
    session

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    console.log(customer_email, metadata, payment_intent, payment_status)
    const result = await checkoutVerify(session_id)
    console.log(result)

    // With payment_intent expanded, this is the full object — its .id
    // is the transaction id (e.g. "pi_...")
    const transactionId =
      payment_intent && typeof payment_intent === "object"
        ? payment_intent.id
        : payment_intent

    // Receipt details (defensive — every field falls back if missing)
    const lineItem = session.line_items?.data?.[0]
    const amount = session.amount_total
    const currency = (session.currency ?? "usd").toUpperCase()
    const amountLabel =
      amount === null
        ? "—"
        : `${currency} ${(amount / 100).toFixed(2)}`

    const paidAt = session.created
      ? new Date(session.created * 1000).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—"

    return (
      <main className="flex min-h-svh items-center justify-center bg-gray-50 px-4 py-10 text-gray-900">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            {/* Success header */}
            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <BadgeCheck className="size-7" />
              </div>

              <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
                Payment Successful!
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Thank you for your purchase — your{" "}
                <span className="font-semibold text-gray-900">Premium</span>{" "}
                plan is now active. A confirmation email will be sent to{" "}
                {customer_email ?? "your email"}.
              </p>
            </div>

            {/* Payment receipt */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h2 className="flex items-center gap-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
                <ReceiptText className="size-3.5" />
                Payment Details
              </h2>

              <div className="mt-3 flex flex-col gap-3 border-t border-gray-200 pt-3">
                <ReceiptRow
                  icon={BadgeCheck}
                  label="Plan"
                  value={lineItem?.description ?? "Premium (Job Seeker)"}
                />

                <ReceiptRow
                  icon={CreditCard}
                  label="Amount Paid"
                  value={amountLabel}
                />

                {/* Transaction id from payment_intent.id */}
                <ReceiptRow
                  icon={ReceiptText}
                  label="Transaction ID"
                  value={transactionId ?? "—"}
                  mono
                />

                <ReceiptRow
                  icon={Mail}
                  label="Email"
                  value={customer_email ?? "—"}
                />

                <ReceiptRow
                  icon={CalendarDays}
                  label="Date"
                  value={paidAt}
                />
              </div>
            </div>

            {/* Next steps */}
            <div className="mt-6 flex flex-col gap-2.5">
              <Button
                render={<Link href="/dashboard/seeker" />}
                nativeButton={false}
                className="h-11 w-full rounded-lg bg-black font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Go to Dashboard
                <ArrowRight className="size-4" />
              </Button>

              <Button
                render={<Link href="/browse-jobs" />}
                nativeButton={false}
                variant="outline"
                className="h-11 w-full rounded-lg border-gray-200 bg-white font-semibold text-gray-900 hover:bg-gray-50"
              >
                <ArrowLeft className="size-4" />
                Back to Browse Jobs
              </Button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Questions about this payment? Email us at{" "}
            <a
              href="mailto:orders@example.com"
              className="font-medium text-gray-900 hover:underline"
            >
              orders@example.com
            </a>
            .
          </p>
        </div>
      </main>
    )
  }

  // Any other status — the payment did not go through
  return (
    <main className="flex min-h-svh items-center justify-center bg-gray-50 px-4 py-10 text-gray-900">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm md:p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <XCircle className="size-7" />
        </div>

        <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
          Payment Not Completed
        </h1>

        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-gray-500">
          <CircleAlert className="size-4 shrink-0" />
          The payment session ended with status &quot;{status}&quot;. No charge
          was made.
        </p>

        <Button
          render={<Link href="/payment" />}
          nativeButton={false}
          className="mt-6 h-11 w-full rounded-lg bg-black font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Try Again
        </Button>
      </div>
    </main>
  )
}
