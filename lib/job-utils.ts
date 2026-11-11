/**
 * Shared display helpers for job data — used by the Manage Jobs table,
 * mobile cards and any future job listing UI.
 */
import type { JobData } from "@/lib/job-data"

/** A job is active until its application deadline has passed. */
export function isJobActive(deadline: string) {
  const today = new Date().toISOString().split("T")[0]
  return deadline >= today
}

/** "৳25,000 - ৳40,000 / per hour" */
export function formatSalary(job: JobData) {
  return `৳${Number(job.salaryMin).toLocaleString()} - ৳${Number(
    job.salaryMax
  ).toLocaleString()} / ${job.salaryFrequency}`
}

/** "20 Dec 2026" */
export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
