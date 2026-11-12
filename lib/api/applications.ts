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
