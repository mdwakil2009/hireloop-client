/**
 * Single shared place for all job application types + demo data.
 * The My Applications page (dashboard/seeker/applications) and the
 * Apply Now button (app/components/ApplyButton) both use this.
 */

/** Application lifecycle shown as the Status pill. */
export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected"

/**
 * Shape of a job application — what gets saved when a seeker applies,
 * plus a snapshot of the job at that moment so the applications list
 * can render without looking the job up again.
 */
export interface JobApplication {
  _id?: string
  /** The job that was applied to (add-jobs collection _id). */
  jobId: string
  /** The seeker (better-auth user id). */
  userId: string
  /** Contact email at application time. */
  email: string

  // --- Job snapshot (copied from the job post when applying) ---
  jobTitle: string
  companyName: string
  category: string
  jobType: string
  location: string
  remoteAllowed: boolean
  salaryMin?: string
  salaryMax?: string
  salaryFrequency?: string
  deadline?: string

  // --- Application lifecycle ---
  status: ApplicationStatus
  /** When the seeker applied (ISO date). */
  appliedAt: string
}

// export const dummyApplications: JobApplication[] = [
//   {
//     jobId: "demo-job-1",
//     userId: "demo-user-1",
//     email: "jane.doe@example.com",
//     jobTitle: "Frontend Developer",
//     companyName: "TechNova BD",
//     category: "Engineering & Tech",
//     jobType: "Full-time",
//     location: "Dhaka, Bangladesh",
//     remoteAllowed: true,
//     salaryMin: "35000",
//     salaryMax: "60000",
//     salaryFrequency: "Monthly",
//     deadline: "2026-12-20",
//     status: "Applied",
//     appliedAt: "2026-11-12T09:30:00.000Z",
//   },
//   {
//     jobId: "demo-job-2",
//     userId: "demo-user-1",
//     email: "jane.doe@example.com",
//     jobTitle: "Senior Product Designer",
//     companyName: "HirePulse Labs",
//     category: "Design",
//     jobType: "Full-time",
//     location: "London, UK",
//     remoteAllowed: true,
//     salaryMin: "90000",
//     salaryMax: "115000",
//     salaryFrequency: "Yearly",
//     deadline: "2026-12-14",
//     status: "Shortlisted",
//     appliedAt: "2026-11-10T14:00:00.000Z",
//   },
//   {
//     jobId: "demo-job-3",
//     userId: "demo-user-1",
//     email: "jane.doe@example.com",
//     jobTitle: "DevOps Specialist",
//     companyName: "HirePulse Platform",
//     category: "Engineering & Tech",
//     jobType: "Full-time",
//     location: "Berlin, Germany",
//     remoteAllowed: false,
//     salaryMin: "95000",
//     salaryMax: "120000",
//     salaryFrequency: "Yearly",
//     deadline: "2026-12-30",
//     status: "Review",
//     appliedAt: "2026-11-08T11:15:00.000Z",
//   },
//   {
//     jobId: "demo-job-4",
//     userId: "demo-user-1",
//     email: "jane.doe@example.com",
//     jobTitle: "Product Marketing Lead",
//     companyName: "HirePulse Network",
//     category: "Marketing",
//     jobType: "Full-time",
//     location: "European Union",
//     remoteAllowed: true,
//     salaryMin: "80000",
//     salaryMax: "105000",
//     salaryFrequency: "Yearly",
//     deadline: "2026-12-15",
//     status: "Interview",
//     appliedAt: "2026-11-05T16:45:00.000Z",
//   },
//   {
//     jobId: "demo-job-5",
//     userId: "demo-user-1",
//     email: "jane.doe@example.com",
//     jobTitle: "QA Automation Engineer",
//     companyName: "HirePulse Platform",
//     category: "Quality",
//     jobType: "Part-time",
//     location: "Dublin, Ireland",
//     remoteAllowed: false,
//     salaryMin: "35",
//     salaryMax: "50",
//     salaryFrequency: "Hourly",
//     deadline: "2026-10-01",
//     status: "Rejected",
//     appliedAt: "2026-10-20T10:00:00.000Z",
//   },
//   {
//     jobId: "demo-job-6",
//     userId: "demo-user-1",
//     email: "jane.doe@example.com",
//     jobTitle: "Business Analyst",
//     companyName: "Nova BD",
//     category: "Business",
//     jobType: "Internship",
//     location: "Chattogram, Bangladesh",
//     remoteAllowed: false,
//     salaryMin: "15000",
//     salaryMax: "25000",
//     salaryFrequency: "Monthly",
//     deadline: "2026-11-28",
//     status: "Applied",
//     appliedAt: "2026-11-12T06:00:00.000Z",
//   },
// ]
