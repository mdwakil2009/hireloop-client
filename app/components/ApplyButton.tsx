
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { JobData } from "@/lib/job-data"
import type { JobApplication } from "@/lib/application-data"

import { applyToJob } from "@/lib/actions/Jobs"
import { getApplicationsCount } from "@/lib/api/applications"
import { GetUserPremiumById } from "@/lib/api/user"

export function ApplyButton({ job }: { job: JobData }) {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const [isLoading, setIsLoading] = useState(false)

  const user = session?.user

  const handleApplyNow = async () => {
    console.log("Apply button clicked!")

    if (isPending) {
      toast.add({
        title: "Please Wait",
        description: "Your session is still loading.",
      })
      return
    }

    if (isLoading) return

    try {
      setIsLoading(true)

      // 1. Check login
      if (!user) {
        toast.add({
          title: "Login Required",
          description: "Please sign in before applying for a job.",
        })

        router.push(
          `/sign-in?redirectTo=/browse-jobs/${job._id}`
        )
        return
      }

      // 2. Check user role
      if (user.role !== "seeker") {
        toast.add({
          title: "Not Allowed",
          description: "Only job seekers can apply for jobs.",
        })
        return
      }

      // 3. Check premium status
      const premiumResult = await GetUserPremiumById(user.id)

      if (!premiumResult) {
        throw new Error("Could not retrieve premium status.")
      }

      // 4. Check application count
      const countResult = await getApplicationsCount(
        `applicantId=${user.id}`
      )

      if (
        !countResult ||
        typeof countResult.count !== "number"
      ) {
        throw new Error("Could not retrieve application count.")
      }

      // 5. Check free application limit
      if (!premiumResult.premium && countResult.count >= 5) {
        toast.add({
          title: "Application Limit Reached",
          description: "Upgrade to premium to apply for more jobs.",
        })

        router.push("/payment")
        return
      }

      // 6. Prepare application data
      const application: Omit<JobApplication, "_id"> = {
        jobId: job._id as string,
        userId: user.id,
        email: user.email,
        jobTitle: job.title,
        companyName: job.companyName,
        category: job.category,
        jobType: job.jobType,
        location: job.location,
        remoteAllowed: job.remoteAllowed,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryFrequency: job.salaryFrequency,
        deadline: job.deadline,
        status: "Applied",
        appliedAt: new Date().toISOString(),
      }

      console.log("Submitting application:", application)

      // 7. Submit application
      const result = await applyToJob(application)

      console.log("Application result:", result)

      // 8. Check result
      if (result?.insertedId) {
        toast.add({
          title: "Application Submitted",
          description: `You have successfully applied for ${job.title} at ${job.companyName}.`,
        })

        router.push("/dashboard/seeker/applications")
      } else {
        throw new Error("Application submission failed.")
      }

    } catch (error) {
      console.error("Apply Error:", error)

      toast.add({
        title: "Application Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleApplyNow}
      type="button"
      disabled={isLoading || isPending}
      className="h-11 rounded-lg bg-black px-6 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending
        ? "Loading..."
        : isLoading
          ? "Applying..."
          : "Apply Now"}
    </Button>
  )
}
