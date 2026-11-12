/**
 * Shared display helpers for job data — used by the Manage Jobs table,
 * browse-jobs filters/sorting, and any future job listing UI.
 */
import type { JobData } from "@/lib/job-data"

/** One selectable option in a filter group, with a match count. */
export interface FilterOption {
  label: string
  count: number
}

/** Count jobs per unique value of a field (for the filter options). */
export function buildFilterOptions(
  jobs: JobData[],
  field: "jobType" | "category"
): FilterOption[] {
  const counts = new Map<string, number>()

  for (const job of jobs) {
    const value = job[field]
    if (!value) continue

    counts.set(value, (counts.get(value) || 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }))
}

/** Remote/On-site options derived from the remoteAllowed field. */
export function workplaceOptions(jobs: JobData[]): FilterOption[] {
  const remote = jobs.filter((job) => job.remoteAllowed).length

  return [
    { label: "Remote", count: remote },
    { label: "On-site", count: jobs.length - remote },
  ]
}

/** A job is active until its application deadline has passed. */
export function isJobActive(deadline: string) {
  const today = new Date().toISOString().split("T")[0]
  return deadline >= today
}

/** Parse a numeric string safely; null for missing/invalid values. */
export function toNumber(value: string | undefined): number | null {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

/**
 * Split a free-text field into bullet list items — the Add Jobs form
 * collects responsibilities/qualifications with "•" or "-" lines.
 */
export function splitListItems(text: string | undefined): string[] {
  if (!text) return []

  return text
    .split(/\n|•/)
    .map((line) => line.replace(/^[-–—*\s]+/, "").trim())
    .filter(Boolean)
}

/** Best available salary number for sorting (max first, then min). */
export function salaryForSort(job: JobData, fallback: number): number {
  return toNumber(job.salaryMax) ?? toNumber(job.salaryMin) ?? fallback
}

/** Posted timestamp for sorting; 0 when missing or invalid. */
export function postedTime(job: JobData): number {
  const time = job.posted ? Date.parse(job.posted) : NaN
  return Number.isNaN(time) ? 0 : time
}

/** Deadline timestamp for sorting; Infinity when missing (sorts last). */
export function deadlineTime(job: JobData): number {
  const time = job.deadline ? Date.parse(`${job.deadline}T00:00:00`) : NaN
  return Number.isNaN(time) ? Infinity : time
}

/** "৳25,000 - ৳60,000 / Monthly" — missing values shown as "—". */
export function formatSalary(job: JobData) {
  const min = toNumber(job.salaryMin)
  const max = toNumber(job.salaryMax)

  if (min === null && max === null) return "Salary not specified"

  const format = (value: number | null) =>
    value === null ? "—" : `৳${value.toLocaleString()}`

  return `${format(min)} - ${format(max)} / ${job.salaryFrequency}`
}

/** "20 Dec 2026" — falls back to the raw value instead of "Invalid Date". */
export function formatDate(date: string) {
  if (!date) return "Not specified"

  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/**
 * "3 days ago" / "2 hours ago" / "just now" — used for the Applied
 * column on the My Applications table. Falls back to a plain date
 * when the value is missing or unparseable.
 */
export function formatRelativeTime(date: string) {
  if (!date) return "Not specified"

  const time = Date.parse(date)
  if (Number.isNaN(time)) return date

  const seconds = Math.floor((Date.now() - time) / 1000)

  if (seconds < 60) return "just now"

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`

  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? "" : "s"} ago`
}
