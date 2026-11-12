
"use client"

import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { JobData } from "@/lib/job-data"

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
        // console.log("Save the application to the database")
        const  application ={
                jobId:job._id,
                userId:user.id,
                email:user.email,
                companyName:job.companyName 

        }
        const  result = await applyToJob(application)
        if(result.insertedId){
                console.log("Application Submitted  Successfully")
                router.push("/browse-jobs")
        }

    }
    else{
        console.log("User is not a job seeker")
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
