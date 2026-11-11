import { isJobActive } from "@/lib/job-utils"

/**
 * Active/Expired status pill, driven purely by the job's deadline —
 * no state needed, works in server components.
 */
export function JobStatusPill({ deadline }: { deadline: string }) {
  const active = isJobActive(deadline)

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
          : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-gray-400"
        }`}
      />
      {active ? "Active" : "Expired"}
    </span>
  )
}
