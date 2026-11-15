"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { updateApplicationStatus } from "@/lib/actions/applications"
import type { ApplicationStatus } from "@/lib/application-data"

// All statuses a recruiter can move an application to
const statusOptions: ApplicationStatus[] = [
  "Applied",
  "Review",
  "Shortlisted",
  "Interview",
  "Rejected",
]

// Compact dropdown styling that fits inside a table cell
const triggerClasses =
  "h-8 w-[130px] rounded-lg border-gray-200 bg-white text-xs font-semibold text-gray-900 shadow-sm hover:border-gray-300 focus:ring-2 focus:ring-black"

const itemClasses =
  "cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"

/**
 * Status dropdown for one application — the recruiter picks a new status,
 * the change is saved through updateApplicationStatus and the page data
 * is refreshed (router.refresh) so the status pill stays in sync.
 */
export function ApplicationStatusSelect({
  applicationId,
  status,
}: {
  applicationId: string
  status: ApplicationStatus
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [saving, setSaving] = useState(false)

  const handleChange = async (next: ApplicationStatus | null) => {
    // Same status re-selected — nothing to do
    if (!next || next === status) return

    setSaving(true)
    try {
      await updateApplicationStatus(applicationId, next)

      toast.add({
        title: "Status Updated",
        description: `The application status was changed to ${next}.`,
      })

      // Re-fetch the server data so the status pill reflects the change
      startTransition(() => router.refresh())
    } catch {
      toast.add({
        title: "Update Failed",
        description:
          "Could not save the new status — the update endpoint is not connected yet.",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Select
      value={status}
      onValueChange={handleChange}
      disabled={saving || pending}
    >
      <SelectTrigger
        aria-label={`Update application status for ${applicationId}`}
        className={triggerClasses}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="z-50 min-w-[140px] rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
        {statusOptions.map((option) => (
          <SelectItem key={option} value={option} className={itemClasses}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
