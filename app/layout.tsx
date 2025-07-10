import type React from "react";
import { Mona_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CustomActionsProvider } from "@/contexts/custom-actions-context";
import { ChunkErrorHandler } from "@/components/chunk-error-handler";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";
import "@/styles/globals.css";
import "@/styles/section-animations.css";
import "@/styles/highlight-animations.css";
import "@/styles/print.css";
import "@/styles/background-effects.css";
import { Suspense } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Chris Thackrey | Full-Stack Software Engineer",
  description:
    "Personal portfolio and blog of Chris Thackrey, a full-stack software engineer specializing in AI, Next.js, and modern web technologies.",
  keywords: [
    "Chris Thackrey",
    "Software Engineer",
    "Full-Stack",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "Vercel",
    "Portfolio",
    "Blog",
  ],
  generator: "v0.dev",
};

export default function RootLayout(
  { children }: { children: React.ReactNode },
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ChunkErrorHandler />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Suspense fallback={null}>
            <CustomActionsProvider>
              <div className="relative flex min-h-dvh flex-col bg-transparent">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </CustomActionsProvider>
            <Toaster />
            <Analytics />
            <SpeedInsights />
            <StagewiseToolbar
              config={{
                plugins: [ReactPlugin],
              }}
            />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
