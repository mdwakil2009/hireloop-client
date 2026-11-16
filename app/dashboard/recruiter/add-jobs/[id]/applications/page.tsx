
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Award, BadgeCheck, Mail, Send, XCircle } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApplicationStatusBadge } from "@/app/components/ApplicationStatusBadge"
import { ApplicationStatusSelect } from "@/app/components/ApplicationStatusSelect"
import { JobCategoryIcon } from "@/app/components/JobCategoryIcon"
import { getJobById } from "@/lib/api/jobs"
import { formatRelativeTime } from "@/lib/job-utils"
import type { JobApplication } from "@/lib/application-data"
import { getApplicationsByJob } from "@/lib/api/applications"

export const metadata: Metadata = {
  title: "Job Applications | Hireloop",
  description: "Review and manage applications for a job post.",
}

// Shared column-header style (same as Manage Jobs)
const headClass = "text-[10px] font-bold tracking-wide text-gray-500 uppercase"

// Small stat tile: icon box + label + value
function StatTile({
  icon: Icon,
  label,
  value,
  iconClasses,
}: {
  icon: typeof Send
  label: string
  value: number
  iconClasses: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconClasses}`}
      >
        <Icon className="size-4.5" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-gray-500">{label}</p>
        <p className="mt-0.5 text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // The job the applications belong to (unknown id → 404)
  const job = await getJobById(id).catch(() => null)
  if (!job) notFound()

  // Only the applications for THIS job (server-side ?jobId= filter)
  const applications: JobApplication[] = await getApplicationsByJob(id)

  // Stats derived from the list so they stay correct as data changes
  const total = applications.length
  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length
  const interviews = applications.filter((a) => a.status === "Interview").length
  const rejected = applications.filter((a) => a.status === "Rejected").length

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white px-3 py-4 text-gray-900 sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <Link
          href="/dashboard/recruiter/manage-jobs"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Manage Jobs
        </Link>

        {/* Header — the job these applications belong to */}
        <div className="mb-5 flex items-start gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <JobCategoryIcon category={job.category} />
          </div>

          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>Manage Jobs</span>
              <span>/</span>
              <span className="max-w-[160px] truncate font-medium text-violet-600">
                {job.title}
              </span>
              <span>/</span>
              <span>Applications</span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Applications
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {job.title} · {job.companyName} — review applicants and update
              their status.
            </p>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile
            icon={Send}
            label="Total Applications"
            value={total}
            iconClasses="bg-gray-100 text-gray-700"
          />

          <StatTile
            icon={BadgeCheck}
            label="Shortlisted"
            value={shortlisted}
            iconClasses="bg-blue-50 text-blue-600"
          />

          <StatTile
            icon={Award}
            label="Interviews"
            value={interviews}
            iconClasses="bg-violet-50 text-violet-600"
          />

          <StatTile
            icon={XCircle}
            label="Rejected"
            value={rejected}
            iconClasses="bg-red-50 text-red-600"
          />
        </div>

        {/* Desktop Table */}
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                All Applicants
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Review each application and update its status
              </p>
            </div>

            <span className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
              {total} Applications
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="h-10 border-b border-gray-100 bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className={`${headClass} pl-4`}>Applicant</TableHead>

                <TableHead className={headClass}>Email</TableHead>

                <TableHead className={headClass}>Applied</TableHead>

                <TableHead className={headClass}>Status</TableHead>

                <TableHead className={`${headClass} pr-3`}>
                  Update Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map((application) => (
                <TableRow
                  key={application._id}
                  className="h-[66px] border-b border-gray-100"
                >
                  <TableCell className="pl-4">
                    <p className="text-xs font-semibold text-gray-800">
                      {application.email.split("@")[0]}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-gray-700">{application.email}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-gray-700">
                      {formatRelativeTime(application.appliedAt)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>

                  <TableCell className="pr-3">
                    <ApplicationStatusSelect
                      key={application._id}
                      applicationId={application._id}
                      status={application.status}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {applications.map((application) => (
            <div
              key={application._id}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-800">
                    {application.email.split("@")[0]}
                  </h3>

                  <p className="mt-0.5 truncate text-[11px] text-gray-400">
                    {application.email}
                  </p>
                </div>

                <ApplicationStatusBadge status={application.status} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                <span className="text-[11px] text-gray-400">
                  Applied {formatRelativeTime(application.appliedAt)}
                </span>

                <ApplicationStatusSelect
                  key={application._id}
                  applicationId={application._id}
                  status={application.status}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center shadow-sm">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <Mail className="size-5" />
            </div>

            <h3 className="mt-3 text-base font-semibold text-gray-800">
              No Applications Yet
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Applications for this job will appear here once seekers apply.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
