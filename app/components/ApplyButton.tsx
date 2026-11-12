
"use client"

import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { JobData } from "@/lib/job-data"
import type { JobApplication } from "@/lib/application-data"

import { applyToJob } from "@/lib/actions/Jobs"

export function ApplyButton({job}:{job:JobData}) {
  const router = useRouter()
  const { data: session } = useSession()

  const user = session?.user

  const handleApplyNow = async() => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }
    else if(user.role=="seeker") {
        // Full application record — job snapshot is copied now so the
        // My Applications list can render without looking the job up again
        const  application:Omit<JobApplication,"_id"> ={
                jobId:job._id as string,
                userId:user.id,
                email:user.email,
                jobTitle:job.title,
                companyName:job.companyName,
                category:job.category,
                jobType:job.jobType,
                location:job.location,
                remoteAllowed:job.remoteAllowed,
                salaryMin:job.salaryMin,
                salaryMax:job.salaryMax,
                salaryFrequency:job.salaryFrequency,
                deadline:job.deadline,
                status:"Applied",
                appliedAt:new Date().toISOString()
        }
        const  result = await applyToJob(application)
        if(result.insertedId){
                toast.add({
                        title:"Application Submitted",
                        description:`You have successfully applied for ${job.title} at ${job.companyName}.`,
                })
                router.push("/dashboard/seeker/applications")
        }
        else{
                toast.add({
                        title:"Application Failed",
                        description:"Something went wrong. Please try again.",
                })
        }

    }
    else{
        toast.add({
                title:"Not Allowed",
                description:"Only job seekers can apply for jobs.",
        })
    }

    // TODO: এখানে logged-in user এর application logic লিখবে
  }

  return (
    <Button
      onClick={handleApplyNow}
      type="button"
      className="h-11 rounded-lg bg-black px-6 font-semibold text-white transition-colors hover:bg-gray-800"
    >
      Apply Now
    </Button>
  )
}
