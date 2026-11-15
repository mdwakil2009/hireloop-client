/**
 * Seed script: creates 5 job-seeker accounts and applies them to
 * two jobs ("Real authenticat user" and "Auth lap").
 *
 * Usage:  node scripts/seed-applicants.cjs
 *
 * - Accounts are created through better-auth (POST /api/auth/sign-up/email)
 *   so they land in the same user collection as real sign-ups.
 * - Each seeker is then signed in (to get the real user id) and an
 *   application is POSTed to the backend /applications endpoint with the
 *   full job snapshot — the same shape ApplyButton sends.
 */

const CLIENT_URL = `http://localhost:3000`
const API_URL = `http://localhost:5000`

const PASSWORD = `12345678`

const seekers = [
  { name: `Ayesha Rahman`, email: `ayesha.seeker@example.com` },
  { name: `Tanvir Hasan`, email: `tanvir.seeker@example.com` },
  { name: `Nusrat Jahan`, email: `nusrat.seeker@example.com` },
  { name: `Rakib Islam`, email: `rakib.seeker@example.com` },
  { name: `Mita Chowdhury`, email: `mita.seeker@example.com` },
]

async function main() {
  // 1. Find the two target jobs in the backend
  const jobs = await fetch(`${API_URL}/add-jobs`).then((r) => r.json())
  const targets = jobs.filter((j) =>
    ["real authenticat user", "auth lap"].includes(j.title.toLowerCase())
  )

  if (targets.length !== 2) {
    throw new Error(
      `Expected 2 jobs, found ${targets.length}: ` +
        targets.map((j) => j.title).join(", ")
    )
  }

  console.log(
    `Target jobs: ${targets.map((j) => `${j.title} (${j._id})`).join(", ")}`
  )

  // 2. Create each seeker, sign in, and apply to both jobs
  for (const seeker of seekers) {
    const signUpRes = await fetch(`${CLIENT_URL}/api/auth/sign-up/email`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
        // better-auth rejects requests without a trusted Origin (CSRF check)
        Origin: CLIENT_URL,
      },
      body: JSON.stringify({ ...seeker, password: PASSWORD, role: `seeker` }),
    })

    if (!signUpRes.ok) {
      console.log(`SKIP ${seeker.email} — sign-up failed (${signUpRes.status}): ${await signUpRes.text()}`)
      continue
    }

    // Sign in to get the real user id (the sign-up response may not include it)
    const signInRes = await fetch(`${CLIENT_URL}/api/auth/sign-in/email`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
        Origin: CLIENT_URL,
      },
      body: JSON.stringify({ email: seeker.email, password: PASSWORD }),
    })

    if (!signInRes.ok) {
      console.log(`SKIP ${seeker.email} — sign-in failed (${signInRes.status})`)
      continue
    }

    const session = await signInRes.json()
    const userId = session.user.id
    console.log(`Created ${seeker.email} (userId: ${userId})`)

    // 3. Apply to both jobs with the full application payload
    for (const job of targets) {
      const application = {
        jobId: job._id,
        userId,
        email: seeker.email,
        jobTitle: job.title,
        companyName: job.companyName,
        category: job.category,
        jobType: job.jobType,
        location: job.location,
        remoteAllowed: job.remoteAllowed,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryFrequency: job.salaryFrequency,
        deadline: job.deadline,
        status: `Applied`,
        appliedAt: new Date().toISOString(),
      }

      const applyRes = await fetch(`${API_URL}/applications`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify(application),
      })

      const result = await applyRes.json()

      if (result.insertedId) {
        console.log(
          `  Applied: ${job.title} → application ${result.insertedId}`
        )
      } else {
        console.log(`  FAILED ${job.title}: ${JSON.stringify(result)}`)
      }
    }
  }

  console.log(`Done.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
