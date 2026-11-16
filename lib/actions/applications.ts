
import type { ApplicationStatus } from "@/lib/application-data"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const updateApplicationStatus = async (
  id: string,
  data: { status: ApplicationStatus }
) => {
  const response = await fetch(
    `${BASE_URL}/applications/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update application status")
  }

  return response.json()
}
