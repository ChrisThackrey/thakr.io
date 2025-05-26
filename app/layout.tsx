import type React from "react"
import "@/app/globals.css"
import "@/styles/highlight-animations.css"
import "@/styles/speed-reading.css"
import "@/styles/selection-popup.css"
import "@/styles/theme-transition.css"
import "@/styles/reading-progress.css"
import "@/styles/animations.css"
import "@/styles/section-transitions.css"
import "@/styles/section-animations.css"
import "@/styles/micro-interactions.css"
import "@/styles/background-effects.css"
import "@/styles/booking.css"
// Import floating-launcher.css if it exists
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageBackground } from "@/components/page-background"
import { SectionBackground } from "@/components/section-background"
import { TransitionLayout } from "@/components/transition-layout"
import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"

// Critical images that should be preloaded on all pages
const criticalImages = [
  "/images/light-background.png",
  "/images/light-background-01.jpg",
  // Add other critical images here
]

export const metadata: Metadata = {
  title: "Chris Thackrey - Software Engineer & Designer",
  description:
    "Personal website of Chris Thackrey, a software engineer and designer specializing in AI, web development, and architecture.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preconnect for any external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <PageBackground />
          <SectionBackground />
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              <TransitionLayout>
                <PageWrapper>{children}</PageWrapper>
              </TransitionLayout>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
