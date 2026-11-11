import type { JobData } from "@/lib/job-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

export const createJob = async(data:JobData)=>{
        const response = await fetch(`${BASE_URL}/add-jobs`,{
                method:"POST",
                headers:{
                 "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
        })
        return response.json()
}