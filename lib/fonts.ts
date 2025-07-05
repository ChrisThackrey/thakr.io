import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

/**
 * Google Inter – body / UI font
 * Creates CSS custom property --font-sans
 */
export const fontSans = GeistSans

/**
 * Cal Sans SemiBold – heading font
 * Creates CSS custom property --font-cal
 */
export const fontCalSans = localFont({
  src: [
    {
      path: "../assets/fonts/CalSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-cal",
  display: "swap",
})

/**
 * Geist Mono – monospace font
 * Creates CSS custom property --font-mono
 */
export const fontMono = GeistMono
