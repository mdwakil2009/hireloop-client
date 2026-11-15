import type { JobApplication } from "@/lib/application-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

/**
 * Fetch job applications, optionally filtered by the seeker's user id
 * (e.g. getApplications(user.id) for the My Applications page).
 */
export const getApplications = async (
  userId?: string
): Promise<JobApplication[]> => {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : ""
  const response = await fetch(`${BASE_URL}/applications${query}`)
  return response.json()
}

/**
 * Applications for one job (recruiter's application review page).
 * The backend does not filter by jobId yet, so the filtering happens
 * here — swap to a server-side ?jobId= filter once it exists.
 */
export const getApplicationsByJob = async (
  jobId: string
): Promise<JobApplication[]> => {
  const all = await getApplications()
  return all.filter((application) => application.jobId === jobId)
}
export const getApplicationsCount = async (
    query: string
): Promise<{count:number}> => {
  const response = await fetch(`${BASE_URL}/applications/count?${query}`)
  return response.json()
}
