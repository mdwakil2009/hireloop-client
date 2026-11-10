import type { Metadata } from "next";

import { AddJobForm } from "./add-job-form";

export const metadata: Metadata = {
  title: "Add Jobs | Hireloop",
  description: "Post a new job and reach thousands of verified job seekers.",
};

export default function AddJobsPage() {
  return <AddJobForm />;
}
