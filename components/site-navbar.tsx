"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import logoUrl from "@/app/images/logo.png"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@base-ui/react"
import { useRouter } from "next/navigation"


export function SiteNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  
const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
 {
  label: "Dashboard",
  href: `/dashboard/${session?.user?.role || "seeker"}`
}
]

  const handleSignOut =async()=>{
    await signOut()
  }
  return (
    <header
      data-slot="site-navbar"
      className={cn(
        "sticky top-0 z-50 px-4 pt-4 md:px-6 md:pt-6",
        className
      )}
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Bar */}
        <div className="flex h-16 items-center justify-between rounded-[16px] bg-[#222222] px-4 ring-1 ring-white/5 md:h-[74px] md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Hireloop home"
          >
            <Image
              src={logoUrl}
              width={114}
              height={32}
              alt="Hireloop"
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* Desktop: links | divider | actions */}
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-white transition-colors hover:text-[#A8A8A8]"
              >
                {link.label}
              </Link>
            ))}

            <span aria-hidden className="h-6 w-px bg-[#A8A8A8]/40" />

            {session?.user ? (
              <>
                <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
                  <span className="text-sm font-medium text-blue-600">
                    Welcome,
                  </span>
                  <span className="text-sm font-bold text-blue-800">
                    {session.user.name}
                  </span>
                </div>

                <Button
                onClick={handleSignOut}
                  className="flex h-12 items-center rounded-xl bg-white px-6 text-base font-semibold text-[#5C53FE] ring-1 ring-white/10 transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Sign Out 
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="flex h-12 items-center rounded-xl bg-white/5 px-6 text-base font-semibold text-[#5C53FE] ring-1 ring-white/10 transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="flex h-12 items-center rounded-xl bg-[#5C53FE] px-6 text-base font-medium text-white transition-all outline-none hover:bg-[#5C53FE]/85 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile: menu toggle */}
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-white transition-colors outline-none select-none hover:bg-white/5 focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden",
              open && "bg-white/5"
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            aria-label="Main mobile"
            className="mt-2 flex flex-col rounded-2xl bg-[#222222] p-3 ring-1 ring-white/5 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-white transition-colors outline-none hover:bg-white/5 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </Link>
            ))}

            <span aria-hidden className="my-2 h-px bg-white/10" />

            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center justify-center rounded-xl bg-white/5 px-6 text-base font-semibold text-[#5C53FE] ring-1 ring-white/10 transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#5C53FE] px-6 text-base font-medium text-white transition-all outline-none hover:bg-[#5C53FE]/85 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
