
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
} from "lucide-react"


import { getJobById } from "@/lib/api/jobs"
import {
  formatDate,
  formatSalary,
  splitListItems,
} from "@/lib/job-utils"
import { ApplyButton } from "@/app/components/ApplyButton"

// Shared card styling
const cardClasses =
  "rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"

// Bento info tile
function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Banknote
  label: string
  value: string
}) {
  return (
    <div className={cardClasses}>
      <Icon className="size-5 text-gray-400" />

      <p className="mt-4 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  )
}

// Bullet list for multi-line text fields
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3 text-sm leading-relaxed text-gray-600"
        >
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gray-400" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const job = await getJobById(id)

  // Unknown job ID → 404 page
  if (!job) {
    notFound()
  }

  const qualifications = splitListItems(job.qualifications)

  return (
    <main className="min-h-svh bg-white px-4 py-8 text-black md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back link */}
        <Link
          href="/browse-jobs"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Browse Jobs
        </Link>

        {/* Header card */}
        <div
          className={`flex flex-wrap items-start justify-between gap-4 ${cardClasses}`}
        >
          <div className="flex min-w-0 items-center gap-4">

            {/* Company logo */}
            <div
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xl font-bold text-gray-800"
            >
              {job.companyName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {job.title}
              </h1>

              <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-600">
                {job.companyName}

                <span
                  aria-hidden
                  className="size-1 rounded-full bg-gray-300"
                />

                {job.remoteAllowed && (
                  <span className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Remote
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label={`Save ${job.title}`}
              className="flex size-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:border-gray-300 hover:text-black"
            >
              <Bookmark className="size-4" />
            </button>

            <ApplyButton job={job} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Main content */}
          <div className="min-w-0">

            {/* Job information grid */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <InfoTile
                icon={Banknote}
                label="Salary Range"
                value={formatSalary(job)}
              />

              <InfoTile
                icon={MapPin}
                label="Location"
                value={job.location || "Not specified"}
              />

              <InfoTile
                icon={BriefcaseBusiness}
                label="Job Type"
                value={job.jobType || "—"}
              />

              <InfoTile
                icon={CalendarDays}
                label="Deadline"
                value={formatDate(job.deadline)}
              />
            </div>

            {/* Job description and requirements */}
            <div className={`mt-6 ${cardClasses}`}>
              <h2 className="text-lg font-bold text-gray-900">
                Job Description
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {job.responsibilities || "No description provided."}
              </p>

              <div className="my-6 border-t border-gray-100" />

              <h2 className="text-lg font-bold text-gray-900">
                Requirements
              </h2>

              {qualifications.length > 0 ? (
                <BulletList items={qualifications} />
              ) : (
                <p className="mt-3 text-sm text-gray-600">
                  No requirements provided.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar - Company Overview */}
          <aside className="h-fit">
            <div className={cardClasses}>
              <h2 className="text-lg font-bold text-gray-900">
                Company Overview
              </h2>

              {/* Company block */}
              <div className="mt-4 flex h-36 items-center justify-center rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
                <span
                  aria-hidden
                  className="text-4xl font-bold text-gray-400"
                >
                  {job.companyName.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Company facts */}
              <div className="mt-4 flex flex-col">

                <div className="flex items-center justify-between border-t border-gray-100 py-3 first:border-t-0">
                  <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                    Industry
                  </p>

                  <p className="truncate text-sm font-semibold text-gray-900">
                    {job.category || "—"}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 py-3">
                  <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                    Work Mode
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {job.remoteAllowed ? "Remote" : "On-site"}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 py-3">
                  <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(job.deadline)}
                  </p>
                </div>
              </div>

              {/* Apply button */}
              <div className="mt-3">
                <div className="w-full [&>button]:w-full [&>button]:h-10">
                   <ApplyButton job={job} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
