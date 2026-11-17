import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin } from "better-auth/plugins"


const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL as string)
const db = client.db("hireloop-db")

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        defaultValue: "seeker",
        input: true,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        // The admin() plugin hard-codes `role` to input:false, so a `role`
        // sent in the sign-up body is rejected. The sign-up form sends the
        // picked role as `signupRole` (ignored by field parsing) and this
        // hook — which runs after the plugin's own hooks, so it wins —
        // applies it, validated server-side. Only "recruiter" is honored:
        // the Admin option was removed from the sign-up form, so self-
        // assigning an admin account must not be possible. Default "seeker".
        before: async (user, ctx) => {
          const requested = (
            ctx as { body?: { signupRole?: string } } | undefined
          )?.body?.signupRole
          const role = requested === "recruiter" ? "recruiter" : "seeker"
          return { data: { ...user, role } }
        },
      },
    },
  },
  plugins: [
     admin()
 ],
  database: mongodbAdapter(db, {
    client,
  }),
})
