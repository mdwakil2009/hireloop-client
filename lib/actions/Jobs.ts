"use server"

import type { JobData } from "@/lib/job-data"
import type { JobApplication } from "@/lib/application-data"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

export const createJob = async(data:JobData)=>{
        const api =`${BASE_URL}/add-jobs`
        const response = await protectedMutation(api,"POST",data)
        return response.json()
}

export  const deleteJob = async(jobId:string)=>{
        const response = await fetch(`${BASE_URL}/add-jobs/${jobId}`,{
                method:"DELETE"
        })
        return response.json()
}  


// import { protectedMutation } from "@/lib/api/api"
// import type { JobApplication } from "@/lib/application-data"

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const applyToJob = async (
  data: Omit<JobApplication, "_id">
) => {
  const api = `${BASE_URL}/applications`

  const response = await protectedMutation(api, "POST", data)

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to submit application."
    )
  }

  return result
}