/**
 * Shape of a job post — the exact payload collected by the Add Jobs form
 * (app/dashboard/recruiter/add-jobs) and POSTed by createJob
 * (lib/actions/Jobs) to the API.
 */
export interface JobData {
  title: string
  companyName: string
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
}

export type JobStatus = "active" | "closed"

/**
 * A JobData row as shown in the Manage Jobs table, with the listing
 * metadata the table adds on top of the stored form data.
 */
export interface JobTableRow extends JobData {
  id: string
  /** Listing lifecycle shown in the Status column */
  status: JobStatus
  /** Display date, e.g. "Oct 24, 2023" */
  datePosted: string
}

export const dummyJobs: JobTableRow[] = [
  {
    id: "HL-90210",
    title: "Senior Product Designer",
    companyName: "Nexus Lab",
    category: "Design",
    jobType: "Full-time",
    remoteAllowed: false,
    location: "San Francisco, CA",
    deadline: "2023-11-30",
    salaryMin: "160000",
    salaryMax: "200000",
    salaryFrequency: "per year",
    responsibilities:
      "Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.",
    qualifications: "5+ years designing complex B2B SaaS products; strong portfolio.",
    status: "active",
    datePosted: "Oct 24, 2023",
  },
  {
    id: "HL-88231",
    title: "Full-stack Engineer",
    companyName: "Quantum",
    category: "Engineering & Tech",
    jobType: "Contract",
    remoteAllowed: true,
    location: "Remote, Global",
    deadline: "2023-11-20",
    salaryMin: "90",
    salaryMax: "140",
    salaryFrequency: "per hour",
    responsibilities:
      "Build and ship customer-facing features across our Next.js + Node.js stack alongside a distributed team.",
    qualifications: "3+ years with React and TypeScript; comfortable owning features end to end.",
    status: "active",
    datePosted: "Oct 22, 2023",
  },
  {
    id: "HL-11022",
    title: "Marketing Director",
    companyName: "Vanguard",
    category: "Marketing",
    jobType: "Full-time",
    remoteAllowed: false,
    location: "New York, NY",
    deadline: "2023-10-28",
    salaryMin: "140000",
    salaryMax: "180000",
    salaryFrequency: "per year",
    responsibilities: "Own the growth strategy and lead a team of five across performance marketing and brand.",
    qualifications: "7+ years in growth marketing; proven team leadership.",
    status: "closed",
    datePosted: "Oct 15, 2023",
  },
  {
    id: "HL-99032",
    title: "Backend Architect",
    companyName: "CloudScale",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remoteAllowed: true,
    location: "Remote, USA",
    deadline: "2023-12-01",
    salaryMin: "180000",
    salaryMax: "220000",
    salaryFrequency: "per year",
    responsibilities: "Design resilient data pipelines and APIs that serve millions of job seekers every day.",
    qualifications: "Deep experience with Go, Kafka and PostgreSQL at scale.",
    status: "active",
    datePosted: "Oct 20, 2023",
  },
  {
    id: "HL-77123",
    title: "UX Research Lead",
    companyName: "Nexus Lab",
    category: "Design",
    jobType: "Part-time",
    remoteAllowed: false,
    location: "Austin, TX",
    deadline: "2023-11-15",
    salaryMin: "70",
    salaryMax: "110",
    salaryFrequency: "per hour",
    responsibilities: "Run discovery and usability studies that ground our product decisions in real user insight.",
    qualifications: "4+ years of UX research experience in product teams.",
    status: "active",
    datePosted: "Oct 18, 2023",
  },
  {
    id: "HL-65011",
    title: "DevOps Engineer",
    companyName: "Quantum",
    category: "Engineering & Tech",
    jobType: "Internship",
    remoteAllowed: true,
    location: "Remote, Global",
    deadline: "2023-11-10",
    salaryMin: "25",
    salaryMax: "40",
    salaryFrequency: "per hour",
    responsibilities: "Improve our CI/CD and observability stack while keeping deploys fast and boring.",
    qualifications: "Familiarity with Docker, Terraform and cloud basics.",
    status: "closed",
    datePosted: "Sep 30, 2023",
  },
]
