"use client"

import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

/**
 * The final pay action. Right now it just shows a toast — when the
 * Stripe integration is added, replace the body with:
 *   1. POST to your API to create a Stripe Checkout Session
 *   2. redirect the user to the returned session URL
 *   3. Stripe redirects back after payment (success/cancel URL)
 */
export function PayButton({
  amount,
  label = "Pay Now",
}: {
  /** Amount in dollars, e.g. 20 → shown as "$20.00". */
  amount: number
  label?: string
}) {
  const handlePay = async () => {
    // TODO: create a Stripe Checkout Session and redirect to it
    toast.add({
      title: "Stripe Checkout",
      description: "The Stripe payment page will be connected here.",
    })
  }

  return (
    <Button
      type="button"
      onClick={handlePay}
      className="h-12 w-full rounded-lg bg-black text-base font-semibold text-white transition-colors hover:bg-gray-800"
    >
      <Lock className="size-4" />
      {label} ${amount.toFixed(2)}
    </Button>
  )
}
