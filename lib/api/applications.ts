import type { JobApplication } from "@/lib/application-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

/**
 * Fetch job applications with optional filters. The params are named
 * explicitly so a jobId can never be sent as a userId by mistake:
 *   - getApplications({ userId })  → a seeker's own applications
 *   - getApplications({ jobId })   → applications for one job
 * The backend maps `applicantId` → userId field.
 */
export const getApplications = async (
  params: { userId?: string; jobId?: string } = {}
): Promise<JobApplication[]> => {
  const query = new URLSearchParams()

  if (params.userId) query.set("applicantId", params.userId)
  if (params.jobId) query.set("jobId", params.jobId)

  const queryString = query.toString()
  const response = await fetch(
    `${BASE_URL}/applications${queryString ? `?${queryString}` : ""}`
  )
  return response.json()
}

/** Applications for one job (recruiter's application review page). */
export const getApplicationsByJob = async (
  jobId: string
): Promise<JobApplication[]> => {
  return getApplications({ jobId })
}
export const getApplicationsCount = async (
    query: string
): Promise<{count:number}> => {
  const response = await fetch(`${BASE_URL}/applications/count?${query}`)
  return response.json()
}
