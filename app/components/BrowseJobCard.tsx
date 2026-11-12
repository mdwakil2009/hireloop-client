import { Bookmark } from "lucide-react"

import { formatSalary } from "@/lib/job-utils"
import type { JobData } from "@/lib/job-data"

// Shared pill styling from the Figma job card (#1A1A1F fill, white/10 ring)
const pillClasses =
  "inline-flex h-[30px] items-center gap-2 rounded-md bg-[#1A1A1F] px-3 text-xs text-[#EDEDEF] ring-1 ring-white/10"

/**
 * Job card for the Browse Jobs grid (also reusable on seeker pages).
 * Pills: salary range, job type, and a green Remote badge when the
 * job allows remote work.
 */
export function BrowseJobCard({ job }: { job: JobData }) {
  return (
    <article className="flex gap-4 rounded-xl bg-[#141418] p-6 ring-1 ring-white/10 transition-colors hover:ring-white/20">
      {/* Company logo box */}
      <div
        aria-hidden
        className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-[#222228] text-xl font-semibold text-[#EDEDEF] ring-1 ring-white/[0.07]"
      >
        {job.companyName.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-[#EDEDEF]">
              {job.title}
            </h3>
            <p className="mt-1 truncate text-sm text-[#6E6E78]">
              {job.companyName} •{" "}
              {job.remoteAllowed
                ? job.location.toLowerCase().includes("remote")
                  ? job.location
                  : `${job.location} (Remote)`
                : job.location}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="rounded-md p-1.5 text-[#8E9192] transition-colors hover:bg-white/5 hover:text-white"
          >
            <Bookmark className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={pillClasses}>{formatSalary(job)}</span>
          <span className={pillClasses}>{job.jobType}</span>

          {job.remoteAllowed && (
            <span className="inline-flex h-[30px] items-center gap-2 rounded-md bg-[#22C55E]/10 px-3 text-xs font-medium text-[#22C55E] ring-1 ring-[#22C55E]/30">
              Remote
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
