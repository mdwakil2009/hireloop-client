
import type { Metadata } from "next";
import Link from "next/link";
import {
  Plus,
  Eye,
  Trash2,
  MapPin,
  Globe,
  Users,
  Code2,
  Palette,
  Megaphone,
  Workflow,
  Pencil,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyJobs, type JobTableRow } from "@/lib/job-data";

export const metadata: Metadata = {
  title: "Manage Jobs | Hireloop",
  description: "Manage all your job posts.",
};

function StatusPill({ status }: { status: JobTableRow["status"] }) {
  const active = status === "active";

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
  );
}

function JobIcon({ category }: { category: string }) {
  const value = category.toLowerCase();

  if (value.includes("design")) {
    return <Palette className="size-4" />;
  }

  if (value.includes("marketing")) {
    return <Megaphone className="size-4" />;
  }

  if (value.includes("quality")) {
    return <Workflow className="size-4" />;
  }

  return <Code2 className="size-4" />;
}

export default function ManageJobsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white px-3 py-4 text-gray-900 sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>Manage Jobs</span>
              <span>/</span>
              <span className="font-medium text-violet-600">
                Job Listings & Postings
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Manage Job Posts
            </h1>

            <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
              Review live listings, monitor applicants, and manage your job
              postings in one place.
            </p>
          </div>

          <Button
            render={<Link href="/dashboard/recruiter/add-jobs" />}
            nativeButton={false}
            className="h-9 w-full shrink-0 rounded-lg bg-violet-600 px-4 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 sm:w-auto"
          >
            <Plus className="size-4" />
            New Job Post
          </Button>
        </div>

        {/* Jobs Summary */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <BriefcaseBusiness className="size-4" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Total Jobs</p>
                <p className="text-lg font-bold text-gray-900">
                  {dummyJobs.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Globe className="size-4" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Active Jobs</p>
                <p className="text-lg font-bold text-gray-900">
                  {dummyJobs.filter((job) => job.status === "active").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                All Job Listings
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Manage and track your published jobs
              </p>
            </div>
            <span className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
              {dummyJobs.length} Listings
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="h-10 border-b border-gray-100 bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className="pl-4 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Job & Dept
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Company
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Type
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Applicants
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Status
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Posted
                </TableHead>
                <TableHead className="pr-3 text-right text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dummyJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="h-[66px] border-b border-gray-100 transition-colors hover:bg-violet-50/30"
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <JobIcon category={job.category} />
                      </div>
                      <div className="min-w-0">
                        <p className="max-w-[145px] truncate text-xs font-semibold text-gray-800">
                          {job.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-violet-600">
                          {job.category}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="min-w-0">
                      <p className="max-w-[115px] truncate text-xs font-medium text-gray-800">
                        {job.companyName}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                        {job.remoteAllowed ? (
                          <>
                            <Globe className="size-3" />
                            Remote
                          </>
                        ) : (
                          <>
                            <MapPin className="size-3" />
                            On-site
                          </>
                        )}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex whitespace-nowrap rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">
                      {job.jobType}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-violet-600">
                      <Users className="size-3.5" />
                      <span>—</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusPill status={job.status} />
                  </TableCell>

                  <TableCell>
                    <p className="whitespace-nowrap text-xs text-gray-700">
                      {job.datePosted}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-1 pr-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Update ${job.title}`}
                        className="size-7 text-violet-600 hover:bg-violet-50"
                      >
                        <Pencil className="size-3.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View ${job.title}`}
                        className="size-7 text-gray-500 hover:bg-gray-100"
                      >
                        <Eye className="size-3.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${job.title}`}
                        className="size-7 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {dummyJobs.map((job) => (
            <div
              key={job.id}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <JobIcon category={job.category} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-semibold leading-snug text-gray-800">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-violet-600">
                      {job.category}
                    </p>
                  </div>
                </div>

                <StatusPill status={job.status} />
              </div>

              {/* Card Details */}
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-gray-100 pt-3">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400">Company</p>
                  <p className="mt-0.5 truncate text-xs font-medium text-gray-700">
                    {job.companyName}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400">Job Type</p>
                  <p className="mt-0.5 truncate text-xs font-medium text-gray-700">
                    {job.jobType}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">Location</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-gray-700">
                    {job.remoteAllowed ? (
                      <>
                        <Globe className="size-3 text-gray-400" />
                        Remote
                      </>
                    ) : (
                      <>
                        <MapPin className="size-3 text-gray-400" />
                        On-site
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">Date Posted</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-gray-700">
                    <CalendarDays className="size-3 text-gray-400" />
                    {job.datePosted}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">Applicants</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-violet-600">
                    <Users className="size-3" />
                    —
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                <Button
                  variant="outline"
                  className="h-8 flex-1 gap-1.5 rounded-lg border-violet-200 bg-violet-50 text-xs text-violet-600 hover:bg-violet-100"
                >
                  <Pencil className="size-3.5" />
                  Update
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`View ${job.title}`}
                  className="size-8 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-100"
                >
                  <Eye className="size-3.5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Delete ${job.title}`}
                  className="size-8 rounded-lg border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {dummyJobs.length === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center shadow-sm">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <Code2 className="size-5" />
            </div>

            <h3 className="mt-3 text-base font-semibold text-gray-800">
              No Jobs Found
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              You have not posted any jobs yet.
            </p>

            <Button
              render={<Link href="/dashboard/recruiter/add-jobs" />}
              nativeButton={false}
              className="mt-4 h-9 rounded-lg bg-violet-600 px-4 text-xs text-white hover:bg-violet-700"
            >
              <Plus className="size-4" />
              Create Your First Job
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
