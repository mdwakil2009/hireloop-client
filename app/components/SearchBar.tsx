"use client"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { useRouter } from "next/navigation"

export  default function SearchBar({
  defaultValue = "",
}: {
  defaultValue?: string
}) {
  const router = useRouter();

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  const formData =  new FormData(event.currentTarget)
  const data = Object.fromEntries(formData.entries())
  console.log(data)
  const  search =  data.search
  const  params =  new  URLSearchParams()
  params.set("search",search as string)
  router.push(`/browse-jobs?${params.toString()}`)
  }
  return (
    <form
    onSubmit={handleSubmit}
      method="GET"
      className="flex w-full flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center"
    >
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />

        <Input
          type="search"
          name="search"
          placeholder="Search job title, skills or company..."
          defaultValue={defaultValue}
          className="h-12 border-0 bg-gray-50 pl-11 text-sm text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
        />
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        className="h-12 w-full rounded-lg bg-black px-7 font-semibold text-white transition-colors hover:bg-gray-800 sm:w-auto"
      >
        <Search className="mr-2 size-4" />
        Search Jobs
      </Button>
    </form>
  )
}
