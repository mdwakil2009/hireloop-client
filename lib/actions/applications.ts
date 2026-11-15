import type { ApplicationStatus } from "@/lib/application-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

/**
 * Update an application's status (e.g. "Review" → "Shortlisted").
 * Expects the backend to expose PATCH /applications/:id — the recruiter
 * can add that endpoint whenever the database side is ready; until then
 * the call fails and the UI shows a clear error toast.
 */
export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
) => {
  const response = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: `PATCH`,
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to update application status (HTTP ${response.status})`
    )
  }

  return response.json()
}
