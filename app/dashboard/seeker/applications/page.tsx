"use  server"
import type { Metadata } from "next"
import Link from "next/link"
import {
  Award,
  BadgeCheck,
  Code2,
  Download,
  Send,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApplicationStatusBadge } from "@/app/components/ApplicationStatusBadge"
import { JobCategoryIcon } from "@/app/components/JobCategoryIcon"
import { type JobApplication } from "@/lib/application-data"
import { formatRelativeTime } from "@/lib/job-utils"
import { getApplications } from "@/lib/api/applications"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "My Applications | Hireloop",
  description: "Track your job applications and interview progress.",
}

// Shared column-header style (small bold uppercase, same as Manage Jobs)
const headClass = "text-[10px] font-bold tracking-wide text-gray-500 uppercase"

export default async function MyApplicationPage() {
  // Dummy data for now — real applications are loaded from the API later
  const session =  await auth.api.getSession({
          headers:await headers()
        })
        const applications: JobApplication[] = await getApplications({
          userId: session?.user.id,
        })
  // Stats computed from the list so they stay correct when real data loads
  const total = applications.length
  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length
  const interviews = applications.filter(
    (a) => a.status === "Interview"
  ).length
  const successRate =
    total === 0 ? 0 : Math.round(((shortlisted + interviews) / total) * 100)

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white px-3 py-4 text-gray-900 sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-medium text-violet-600">
                My Applications
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              My Applications
            </h1>

            <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Active / Archived toggle (presentational for now) */}
            <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs font-semibold">
              <button
                type="button"
                className="rounded-md bg-white px-4 py-1.5 text-gray-900 shadow-sm"
              >
                Active
              </button>

              <button
                type="button"
                className="rounded-md px-4 py-1.5 text-gray-500 transition-colors hover:text-gray-900"
              >
                Archived
              </button>
            </div>

            {/* Export PDF (presentational for now) */}
            <Button
              variant="outline"
              className="h-9 shrink-0 rounded-lg border-gray-200 bg-white px-4 text-xs font-semibold text-gray-900 hover:bg-gray-50"
            >
              <Download className="size-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
              <Send className="size-4.5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-500">
                Total Applied
              </p>
              <p className="mt-0.5 text-xl font-bold text-gray-900">{total}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BadgeCheck className="size-4.5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-500">
                Shortlisted
              </p>
              <p className="mt-0.5 text-xl font-bold text-gray-900">
                {shortlisted}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Award className="size-4.5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-500">
                Interviews
              </p>
              <p className="mt-0.5 text-xl font-bold text-gray-900">
                {interviews}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="size-4.5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-500">
                Success Rate
              </p>
              <p className="mt-0.5 text-xl font-bold text-gray-900">
                {successRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                All Applications
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Jobs you have applied for
              </p>
            </div>

            <span className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
              {total} Applications
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="h-10 border-b border-gray-100 bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className={`${headClass} pl-4`}>Job Title</TableHead>

                <TableHead className={headClass}>Company</TableHead>

                <TableHead className={headClass}>Applied</TableHead>

                <TableHead className={headClass}>Status</TableHead>

                <TableHead className={`${headClass} pr-3 text-right`}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map((application, index) => (
                <TableRow
                  key={application._id || `${application.jobId}-${index}`}
                  className="h-[66px] border-b border-gray-100 transition-colors hover:bg-violet-50/30"
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <JobCategoryIcon category={application.category} />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[180px] truncate text-xs font-semibold text-gray-800">
                          {application.jobTitle}
                        </p>
                        <p className="mt-0.5 text-[10px] text-violet-600">
                          {application.category}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="max-w-[130px] truncate text-xs font-medium text-gray-800">
                      {application.companyName}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs whitespace-nowrap text-gray-700">
                      {formatRelativeTime(application.appliedAt)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>

                  <TableCell className="pr-4 text-right">
                    <Button
                      render={
                        <Link href={`/browse-jobs/${application.jobId}`} />
                      }
                      nativeButton={false}
                      variant="outline"
                      className="h-8 rounded-lg border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {applications.map((application, index) => (
            <div
              key={application._id || `${application.jobId}-${index}`}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <JobCategoryIcon category={application.category} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm leading-snug font-semibold break-words text-gray-800">
                      {application.jobTitle}
                    </h3>
                    <p className="mt-1 text-[11px] text-violet-600">
                      {application.category}
                    </p>
                  </div>
                </div>

                <ApplicationStatusBadge status={application.status} />
              </div>

              {/* Card details */}
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-gray-100 pt-3">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400">Company</p>
                  <p className="mt-0.5 truncate text-xs font-medium text-gray-700">
                    {application.companyName}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400">Applied</p>
                  <p className="mt-0.5 text-xs font-medium text-gray-700">
                    {formatRelativeTime(application.appliedAt)}
                  </p>
                </div>
              </div>

              {/* Card action */}
              <div className="mt-3 border-t border-gray-100 pt-3">
                <Button
                  render={<Link href={`/browse-jobs/${application.jobId}`} />}
                  nativeButton={false}
                  variant="outline"
                  className="h-8 w-full rounded-lg border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center shadow-sm">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <Code2 className="size-5" />
            </div>

            <h3 className="mt-3 text-base font-semibold text-gray-800">
              No Applications Yet
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Jobs you apply for will show up here.
            </p>

            <Button
              render={<Link href="/browse-jobs" />}
              nativeButton={false}
              className="mt-4 h-9 rounded-lg bg-violet-600 px-4 text-xs text-white hover:bg-violet-700"
            >
              Browse Jobs
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
