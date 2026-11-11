/**
 * Shape of a job post — the exact payload collected by the Add Jobs form
 * (app/dashboard/recruiter/add-jobs) and POSTed by createJob
 * (lib/actions/Jobs) to the API.
 */
export interface JobData {
  _id?: string;
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  remoteAllowed: boolean;
  location: string;
  deadline: string;
  salaryMin: string;
  salaryMax: string;
  salaryFrequency: string;
  responsibilities: string;
  qualifications: string;
  applicants: number;
  status: "Active" | "Inactive";
  posted: string;
}



/**
 * A JobData row as shown in the Manage Jobs table, with the listing
 * metadata the table adds on top of the stored form data.
 */
export interface JobTableRow extends JobData {
  id: string
  /** Listing lifecycle shown in the Status column */
  /** Display date, e.g. "Oct 24, 2023" */
  posted: string
}
