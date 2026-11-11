"use client"

import { useState } from "react"
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  MapPin,
  Globe2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/actions/Jobs"
import type { JobData } from "@/lib/job-data";
const fieldClasses =
  "h-10 w-full rounded-lg border border-gray-200 bg-white text-sm text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20"

const labelClasses = "text-sm font-medium text-gray-700"

const sectionClasses =
  "rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm"

function SelectField({
  name,
  defaultValue,
  placeholder,
  options,
}: {
  name: string
  defaultValue?: string
  placeholder?: string
  options: { value: string; label: string }[]
}) {
  return (
    <Select name={name} defaultValue={defaultValue}>
      <SelectTrigger className={`${fieldClasses} px-3`}>
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>

      <SelectContent className="border-gray-200 bg-white text-gray-900">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-gray-700 focus:bg-violet-50 focus:text-violet-700"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function AddJobForm() {
  const [jobType, setJobType] = useState("Full-time")
  const [remoteAllowed, setRemoteAllowed] = useState(false)

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const get = (key: string) => String(formData.get(key) ?? "")
    const data: JobData = {
      title: get("title"),
      companyName: get("companyName"),
      category: get("category"),
      jobType,
      remoteAllowed,
      location: get("location"),
      deadline: get("deadline"),
      salaryMin: get("salaryMin"),
      salaryMax: get("salaryMax"),
      salaryFrequency: get("salaryFrequency"),
      responsibilities: get("responsibilities"),
      qualifications: get("qualifications"),
    }
    console.log("New job data:", data)
 
    const result = await createJob(data)
    console.log(result)
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-gray-900 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-5 border-b border-gray-200 pb-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                <span>Manage Jobs</span>
                <ChevronRight size={13} />
                <span className="text-violet-600">Create New Listing</span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                Post a New Job
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Fill in the position specifications to attract qualified talent
                across our network.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* 1. Basic Information */}
            <Card className={sectionClasses}>
              <CardContent className="space-y-5 p-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    1. Basic Information
                  </h2>
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className={labelClasses}>
                    Job Title <span className="text-violet-600">*</span>
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. Frontend Developer"
                    className={fieldClasses}
                  />
                </div>

                {/* Company and Category */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className={labelClasses}>
                      Company Name <span className="text-violet-600">*</span>
                    </Label>

                    <div className="relative">
                      <Building2
                        size={16}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                      />

                      <Input
                        id="companyName"
                        name="companyName"
                        required
                        placeholder="Your company name"
                        className={`${fieldClasses} pl-9`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className={labelClasses}>
                      Job Category <span className="text-violet-600">*</span>
                    </Label>

                    <SelectField
                      name="category"
                      placeholder="Select category"
                      options={[
                        {
                          value: "Engineering & Tech",
                          label: "Engineering & Tech",
                        },
                        { value: "Design", label: "Design" },
                        { value: "Marketing", label: "Marketing" },
                        { value: "Business", label: "Business" },
                        { value: "Finance", label: "Finance" },
                        {
                          value: "Customer Support",
                          label: "Customer Support",
                        },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <Label className={labelClasses}>
                    Job Type <span className="text-violet-600">*</span>
                  </Label>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {["Full-time", "Part-time", "Contract", "Internship"].map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setJobType(type)}
                          className={`h-10 rounded-lg border text-sm font-medium transition-all ${
                            jobType === type
                              ? "border-violet-500 bg-violet-50 text-violet-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-gray-50"
                          }`}
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Location, Compensation & Timeline */}
            <Card className={sectionClasses}>
              <CardContent className="space-y-5 p-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    2. Location, Compensation & Timeline
                  </h2> 
                </div>

                {/* Remote Toggle */}
                <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100">
                      <Globe2 size={17} className="text-violet-600" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Remote Work Allowed (isRemote)
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        Enable worldwide or distributed candidate applications
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={remoteAllowed}
                    aria-label="Remote work allowed"
                    onClick={() => setRemoteAllowed(!remoteAllowed)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      remoteAllowed ? "bg-violet-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                        remoteAllowed ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Location and Deadline */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location" className={labelClasses}>
                      Job Location <span className="text-violet-600">*</span>
                    </Label>

                    <div className="relative">
                      <MapPin
                        size={16}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                      />

                      <Input
                        id="location"
                        name="location"
                        required
                        placeholder="e.g. New York, USA"
                        className={`${fieldClasses} pl-9`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className={labelClasses}>
                      Application Deadline
                    </Label>

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                      />

                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        className={`${fieldClasses} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin" className={labelClasses}>
                      Min Salary / Rate
                    </Label>

                    <Input
                      id="salaryMin"
                      name="salaryMin"
                      type="number"
                      min="0"
                      placeholder="e.g. 25"
                      className={fieldClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMax" className={labelClasses}>
                      Max Salary / Rate
                    </Label>

                    <Input
                      id="salaryMax"
                      name="salaryMax"
                      type="number"
                      min="0"
                      placeholder="e.g. 40"
                      className={fieldClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className={labelClasses}>Frequency</Label>

                    <SelectField
                      name="salaryFrequency"
                      defaultValue="per hour"
                      options={[
                        { value: "per hour", label: "Per hour" },
                        { value: "per day", label: "Per day" },
                        { value: "per week", label: "Per week" },
                        { value: "per month", label: "Per month" },
                        { value: "per year", label: "Per year" },
                      ]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Responsibilities & Requirements */}
            <Card className={sectionClasses}>
              <CardContent className="space-y-5 p-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    3. Responsibilities & Requirements
                  </h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities" className={labelClasses}>
                    Key Responsibilities{" "}
                    <span className="text-violet-600">*</span>
                  </Label>

                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    required
                    rows={4}
                    placeholder="Describe the main responsibilities of this role..."
                    className="min-h-28 resize-y rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications" className={labelClasses}>
                    Qualifications & Requirements{" "}
                    <span className="text-violet-600">*</span>
                  </Label>

                  <Textarea
                    id="qualifications"
                    name="qualifications"
                    required
                    rows={4}
                    placeholder="• Required skills and experience&#10;• Educational qualifications&#10;• Additional requirements"
                    className="min-h-28 resize-y rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions */}
            <div className="flex flex-wrap justify-end gap-3 pb-6">
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  setJobType("Full-time")
                  setRemoteAllowed(false)
                }}
                className="h-10 rounded-lg border-gray-200 bg-white px-6 text-gray-600 hover:bg-gray-50"
              >
                Reset Form
              </Button>

              <Button
                type="submit"
                className="h-10 rounded-lg bg-violet-600 px-6 font-semibold text-white hover:bg-violet-700"
              >
                Publish Job
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
