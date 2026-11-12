import Link from "next/link"
import { Bookmark, MapPin, Wallet } from "lucide-react"

import { formatSalary } from "@/lib/job-utils"
import type { JobData } from "@/lib/job-data"

const pillClasses =
  "inline-flex min-h-8 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"

export function BrowseJobCard({ job }: { job: JobData }) {
  return (
    <article className="group relative flex h-full gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg sm:p-6">
      {/* Clickable job details area */}
      <Link href={`/browse-jobs/${job._id}`}
        aria-label={`View details for ${job.title}`}
        className="absolute inset-0 z-0 rounded-xl">
      </Link>
      {/* Company logo */}
      <div
        aria-hidden
        className="pointer-events-none relative z-10 flex size-14 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xl font-bold text-gray-800 transition-colors group-hover:bg-gray-100 sm:size-16"
      >
        {job.companyName.charAt(0).toUpperCase()}
      </div>

      <div className="pointer-events-none relative z-10 min-w-0 flex-1">
        {/* Job title and bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-base leading-6 font-bold text-gray-900 transition-colors group-hover:text-emerald-700 sm:text-lg">
              {job.title}
            </h3>

            <p className="mt-1 truncate text-sm font-semibold text-gray-600">
              {job.companyName}
            </p>

            <div className="mt-2 flex min-w-0 items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="size-4 shrink-0 text-gray-400" />
              <span className="truncate">
                {job.remoteAllowed
                  ? job.location.toLowerCase().includes("remote")
                    ? job.location
                    : `${job.location} (Remote)`
                  : job.location}
              </span>
            </div>
          </div>

          {/* Bookmark button */}
          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="pointer-events-auto relative z-20 shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-gray-500 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <Bookmark className="size-4" />
          </button>
        </div>

        {/* Job information badges */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={pillClasses}>
            <Wallet className="size-3.5 text-gray-500" />
            {formatSalary(job)}
          </span>

          <span className={pillClasses}>{job.jobType}</span>

          {job.remoteAllowed && (
            <span className="inline-flex min-h-8 items-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Remote
            </span>
          )}
        </div>

        {/* View Details */}
        <p className="mt-4 text-sm font-semibold text-emerald-700">
          View Details →
        </p>
      </div>
    </article>
  )
}
