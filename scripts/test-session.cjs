// Creates a Stripe test checkout session and optionally expires it.
// Usage:
//   node test-session.cjs create   → prints { id, url } (status: open)
//   node test-session.cjs expire <session_id> → expires it (status: expired)
// The secret key is read from .env and never printed.
const fs = require("fs")
const path = require("path")

const envText = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8")
const keyLine = envText.split(/\r?\n/).find((l) => l.startsWith("STRIPE_SECRET_KEY="))
const key = keyLine.slice("STRIPE_SECRET_KEY=".length).trim()

const Stripe = require("stripe")
const stripe = new Stripe(key)

async function main() {
  const [cmd, sessionId] = process.argv.slice(2)

  if (cmd === "create") {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        { price: "price_1UbWj8Pl2Dp9MzCPBfrfn24C", quantity: 1 },
      ],
      mode: "payment",
      success_url:
        "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/payment",
    })
    console.log(JSON.stringify({ id: session.id, url: session.url }))
  } else if (cmd === "expire") {
    const session = await stripe.checkout.sessions.expire(sessionId)
    console.log(JSON.stringify({ id: session.id, status: session.status }))
  } else {
    console.log("unknown command")
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
