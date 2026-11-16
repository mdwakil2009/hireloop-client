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
  plugins: [
     admin() 
 ],
  database: mongodbAdapter(db, {
    client,
  }),
})
