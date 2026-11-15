/**
 * Single shared place for all job types.
 * Used by: add-jobs form, manage-jobs table, lib/actions/Jobs, lib/api/jobs,
 * and app/components (DeleteJobDialog, JobStatusPill, JobCategoryIcon).
 */

/** Listing lifecycle shown in the Status column of the Manage Jobs table. */
export type JobStatus = "Active" | "Inactive"

/**
 * Shape of a job post — the exact payload collected by the Add Jobs form
 * (app/dashboard/recruiter/add-jobs) and POSTed by createJob
 * (lib/actions/Jobs) to the API.
 */
export interface JobData {
  _id?: string
  title: string
  companyName: string
  recruiterId: string
  companyId?: string
  category: string
  jobType: string
  remoteAllowed: boolean
  location: string
  deadline: string
  salaryMin: string
  salaryMax: string
  salaryFrequency: string
  responsibilities: string
  qualifications: string
  /** Listing metadata the API assigns — not collected by the Add Jobs form. */
  applicants?: number
  status?: JobStatus
  posted?: string
}
