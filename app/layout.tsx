import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation" // Assuming you have a Navigation component
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chris Thackrey - Full-Stack Developer",
  description: "Personal portfolio and blog of Chris Thackrey, a full-stack software engineer.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            {" "}
            {/* Ensures full height and flex column */}
            <Navigation /> {/* Your site navigation */}
            <main className="flex flex-col flex-grow">
              {" "}
              {/* Main content area grows and is a flex column */}
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
