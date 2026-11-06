import { Geist, Geist_Mono, Manrope, Plus_Jakarta_Sans, Space_Mono, Inter_Tight, Instrument_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavbar } from "@/components/site-navbar"
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontManrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

const fontJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

const fontInstrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" })

const fontSpaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" })

const fontInterTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        fontManrope.variable,
        fontJakarta.variable,
        fontInstrument.variable,
        fontSpaceMono.variable,
        fontInterTight.variable
      )}
    >
      <body>
        <ThemeProvider>
          <SiteNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
