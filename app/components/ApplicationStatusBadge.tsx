import type { ApplicationStatus } from "@/lib/application-data"

// Status pill colors (white theme) — one entry per ApplicationStatus
const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "border-gray-200 bg-gray-50 text-gray-600",
  Review: "border-amber-200 bg-amber-50 text-amber-700",
  Shortlisted: "border-blue-200 bg-blue-50 text-blue-700",
  Interview: "border-violet-200 bg-violet-50 text-violet-700",
  Rejected: "border-red-200 bg-red-50 text-red-700",
}

/** Colored status pill used on the My Applications table. */
export function ApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}
