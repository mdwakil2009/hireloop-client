// Ground-truth isolation test: reads the `aplication` collection directly
// from MongoDB, PATCHes ONE application through the API (same as the UI),
// then re-reads MongoDB and verifies only that document changed.
import fs from "fs"
import { MongoClient } from "mongodb"

const env = fs.readFileSync(new URL("../../hireloop-server/.env", import.meta.url), "utf8")
const val = (k) => {
  const line = env.split(/\r?\n/).find((l) => l.startsWith(k + "="))
  return line.slice(k.length + 1).trim()
}

const url = `mongodb://${val("MONGODB_USER")}:${val("MONGODB_PASSWORD")}@ac-o16zifh-shard-00-00.6rnndqw.mongodb.net:27017,ac-o16zifh-shard-00-01.6rnndqw.mongodb.net:27017,ac-o16zifh-shard-00-02.6rnndqw.mongodb.net:27017/?ssl=true&replicaSet=atlas-vfp5ky-shard-0&authSource=admin`

const API = "http://localhost:5000"
const jobId = "6af9d45d61b2bc01fe97b606"

const client = new MongoClient(url)
await client.connect()
const col = client.db("hireloop-db").collection("aplication")

const before = await col.find({ jobId }).toArray()
console.log("BEFORE (MongoDB direct):", before.length, "docs")
before.forEach((a) => console.log(" ", a._id.toString(), a.email, "→", a.status))

const target = before[0]
const res = await fetch(`${API}/applications/${target._id.toString()}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "Interview" }),
})
const patchResult = await res.json()
console.log("PATCH response:", JSON.stringify(patchResult))

const after = await col.find({ jobId }).toArray()
const changed = after.filter((a) => {
  const b = before.find((x) => x._id.toString() === a._id.toString())
  return b && b.status !== a.status
})
console.log("AFTER (MongoDB direct): changed docs =", changed.length)
changed.forEach((a) => console.log("  changed:", a._id.toString(), a.email, "→", a.status))

const othersRetained = after.every((a) => {
  const b = before.find((x) => x._id.toString() === a._id.toString())
  return b && (b.status === a.status || a._id.toString() === target._id.toString())
})
console.log("All other applications retained their status:", othersRetained)

await client.close()
