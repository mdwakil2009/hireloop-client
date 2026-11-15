import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import GetSession from "@/lib/core/server"

export async function POST() {
  const userSession = await GetSession()
  console.log("user Sessionf",userSession)
  try {
    const headersList = await headers()
    const origin = headersList.get("origin")

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1UbWj8Pl2Dp9MzCPBfrfn24C",
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: userSession?.user.id ?? null,
      },
      customer_email: userSession?.user.email,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "hire_loop_web",
    })
    return NextResponse.redirect(session.url as string, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
