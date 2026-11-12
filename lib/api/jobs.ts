import type { JobData } from "@/lib/job-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

/** Fetch all jobs, optionally with a query string from searchParams (e.g. "search=react"). */
export const getJobs = async (query = ""): Promise<JobData[]> => {
        const response = await fetch(`${BASE_URL}/add-jobs${query ? `?${query}` : ""}`)
        return response.json()
}
